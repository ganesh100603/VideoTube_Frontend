import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast, { LoaderIcon } from "react-hot-toast";
import { BASE_URL } from "../../constants";

const initialState = {
    loading:false,
    comments:[],
    totalComments:null,
    hasNextPage:null
}

export const createComment = createAsyncThunk("createCommetn",async({videoId,content})=>{
    try {
        const response = await axiosInstance.post(`/comments/${videoId}`,{content})
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const editComment = createAsyncThunk("editComment",async({commentId,content})=>{
    try {
        const response = await axiosInstance.patch(`/comments/c/${commentId}`,{content})
        toast.success(response.data.message)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const deleteComment = createAsyncThunk("deleteComment",async(commentId)=>{
    try {
        const response = await axiosInstance.delete(`/comments/c/${commentId}`)
        toast.success(response.data.message)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const getVideoComments = createAsyncThunk("getVideoComments",async({videoId,page,limit})=>{
    const url = new URL(`${BASE_URL}/comments/${videoId}`)
    if(page) url.searchParams.set("page",page)
    if(limit) url.searchParams.set("limit",limit)
    try {
        const response = await axiosInstance.get(url)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

const commentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{
        cleanUpComments:(state)=>{
            state.comments = []
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getVideoComments.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getVideoComments.fulfilled,(state,action)=>{
            state.loading = false,
            state.comments=[...state.comments,...action.payload.docs]
            state.totalComments = action.payload.totalDocs
            state.hasNextPage=action.payload.hasNextPage
        })
        builder.addCase(createComment.fulfilled,(state,action)=>{
            state.comments.unshift(action.payload)            
            state.totalComments++
        })
        builder.addCase(editComment.fulfilled,(state,action)=>{
            const updatedComment = action.payload
            const index = state.comments.findIndex((c)=>c._id === updatedComment._id)
            if(index!==-1){
                state.comments[index] = updatedComment
            }
        })
        builder.addCase(deleteComment.fulfilled,(state,action)=>{
            state.comments=state.comments.filter(
                (comment)=>comment._id !== action.payload.commentId
            )
            state.totalComments--
        })
    }
})

export const {cleanUpComments} = commentSlice.actions
export default commentSlice.reducer