import React from "react";
import { useNavigate } from "react-router-dom";

function Avatar({src,channelName,width}){
    const navigate = useNavigate()

    const handleAvatarClick = (e) =>{
        e.stopPropagation()
        if(!channelName) return
        navigate(`/channel/${channelName}`)
    }

    return(
        <>
            <img 
                src={src}
                alt="avatar"
                className={`w-8 h-8 rounded-full object-cover`}
                onClick={handleAvatarClick}
                width={width}
            />
        </>
    )
}

export default Avatar