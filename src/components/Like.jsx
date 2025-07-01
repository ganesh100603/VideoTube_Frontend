import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {GrDislike,GrLike} from "./icons"
import { toggleVideoLike,toggleCommentLike,toggleTweetLike } from "../store/Slices/likeSlice";

function Like({isLiked,likesCount=0,tweetId,videoId,commentId,size}){
    const dispatch = useDispatch()
    const [localIsLiked,setLocalIsLiked] = useState(isLiked)
    const [localLikesCount,setlocalLikesCount] = useState(likesCount)

    useEffect(()=>{
        setLocalIsLiked(isLiked)
        setlocalLikesCount(likesCount)
    },[isLiked,likesCount])

    const handleLikeToggle = () => {
        setLocalIsLiked((prev)=>!prev)
        if(localIsLiked){
            setlocalLikesCount((prev)=>prev-1)
        }else{
            setlocalLikesCount((prev)=>prev+1)
        }

        if(tweetId){
            dispatch(toggleTweetLike(tweetId))
        }
        if(commentId){
            dispatch(toggleCommentLike(commentId))
        }
        if(videoId){
            dispatch(toggleVideoLike(videoId))
        }
    }

    

    return(
        <>
            <div className="flex items-center gap-1">
                <GrLike
                size={size}
                onClick={handleLikeToggle}
                className={`cursor-pointer ${localIsLiked?"text-red-600":""}`}
                />
                <span className="text-xs mr-3">{localLikesCount}</span>
                <GrDislike size={size}/>
            </div>
        </>
    )
}

export default Like