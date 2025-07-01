import React, { useEffect } from "react";
import { ChannelHeader, ChannelNavigate } from "../../components";
import { useDispatch,useSelector } from "react-redux";
import { getUserChannelProfile } from "../../store/Slices/userSlice";
import { Outlet,useParams } from "react-router-dom";

function Channel(){
    const dispatch = useDispatch()
    const {username} = useParams()

    useEffect(()=>{
        dispatch(getUserChannelProfile(username))
    },[dispatch,username])

    const channel= useSelector((state)=>state.user?.profileData)
    window.scrollTo(0,0)

    return(
        <>
            {channel&&(
                ChannelHeader&&(
                    <ChannelHeader
                    username={username}
                    coverImage={channel.coverImage}
                    avatar={channel.avatar}
                    subscribedCount={channel?.channelsSubscribedTo}
                    fullname={channel?.fullname}
                    subscribersCount={channel?.subscribersCount}
                    isSubscribed={channel?.isSubscribed}
                    channelId={channel?._id}
                    />
                )
            )}

            <ChannelNavigate username={username}/>
            <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
                <Outlet/>
            </div>
        </>
    )
}

export default Channel