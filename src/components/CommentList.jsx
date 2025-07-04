import React, { useState } from "react";
import {timeAgo} from "../helpers/tiemAgo"
import {Like,DeleteConfirmation,Edit} from ".";
import {RxDotsVertical} from "./icons"
import { deleteComment,editComment } from "../store/Slices/commentSlice";
import { useDispatch, useSelector } from "react-redux";

function CommentList({
    avatar,
    username,
    createdAt,
    content,
    commentId,
    isLiked,    
    likesCount
}){
    const avatar2 = useSelector((state)=>state.auth?.userData?.avatar)
    const authUsername = useSelector((state)=>state.auth?.userData?.username)
    const dispatch = useDispatch()

    const [editState,setEditState] = useState(
        {
            editing:false,
            editedContent:content,
            isOpen:false,
            delete:false
        }
    )

    const handleEditComment = (editedContent) =>{
        dispatch(editComment({commentId,content:editedContent}))
        setEditState((prevState)=>({
            ...prevState,
            editing:false,
            editedContent,
            isOpen:false,
            delete:false
        }))
    }

    const handleDeleteComment = ()=>{
        dispatch(deleteComment(commentId))
        setEditState((prevState)=>({
            ...prevState,
            delete:false
    }))
    }

    return(
        <>
            <div className="text-white w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
                <div className="w-12">
                    <img
                        src={avatar || avatar2}
                        className="w-10 h-10 object-cover rounded-full"
                    />
              </div>
              <div className="w-full flex flex-col gap-1 relative">
                <div className="flex items-center gap-2">
                    <h2 className="text-xs">{username}</h2>
                    <span className="text-xs text-slate-400">
                        {timeAgo(createdAt)}
                    </span>
                </div>

                {authUsername===username &&(
                    <div className="absolute right-0">
                        <div className="relative">
                            <div className="p-2 sm:p-1.5 cursor-pointer hover:bg-slate-500 opacity-80 rounded-full duration-200 transition-all flex 
                            items-center justify-center">
                            <RxDotsVertical
                            size={18}
                            className="text-white "
                            onClick={()=>setEditState((prevState)=>({
                                ...prevState,
                                isOpen:!prevState.isOpen
                            }))}
                            />
                            </div>

                            {editState.isOpen && (
                                <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-8 top-0 rounded-xl">
                                    <ul>
                                        <li className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                                        onClick={()=>setEditState(
                                            (prevState)=>({
                                                ...prevState,
                                                editing:!prevState.editing,
                                                isOpen:false
                                            })
                                        )}
                                        >
                                            Edit
                                        </li>
                                        <li className="px-5 hover:opacity-50 cursor-pointer"
                                        onClick={()=>setEditState(
                                            (prevState)=>({
                                            ...prevState,
                                            delete:true,
                                            isOpen:false
                                        }))}
                                        >
                                            Delete
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {editState.delete&&(
                    <DeleteConfirmation
                    onCancel={()=>setEditState((prevState)=>({
                        ...prevState,
                        delete:false,
                        isOpen:false
                    }))}
                    onDelete={handleDeleteComment}
                    comment={true}
                    />
                )}

                {editState.editing?(
                    <Edit
                        initialContent={editState.editedContent}
                        onCancel={()=>setEditState((prevState)=>({
                            ...prevState,
                            editing:false,
                            isOpen:false
                        }))}
                        onSave={handleEditComment}
                    />
                ):(
                    editState.editedContent
                )}

                <Like
                isLiked={isLiked}
                likesCount={likesCount}
                commentId={commentId}
                size={17}
                />
              </div>
            </div>
        </>
    )
}

export default CommentList