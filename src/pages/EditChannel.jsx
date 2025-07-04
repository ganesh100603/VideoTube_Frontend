import React from "react";
import { ChannelHeader,ChannelNavigate,Spinner } from "../components";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function EditChannel(){
    const channel = useSelector((state)=>state.user?.profileData)    
    const loading = useSelector((state)=>state.auth?.loading)
    window.scrollTo(0,0)

    return(
        <>
        {loading&&(
            <div className="w-full fixed top-20 flex justify-center z-20">
                <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                    <Spinner/>
                    <span className="text-md font-bold text-white">
                    wait a moment...
                    </span>
                </div>
            </div>
        )}

        {channel&&(
            <ChannelHeader
                username={channel?.username}
                coverImage={channel?.coverImage}
                avatar={channel?.avatar}
                subscribedCount={channel?.channelsSubscribedTo}
                fullname={channel?.fullname}
                subscribersCount={channel?.subscribersCount}
                isSubscribed={channel?.isSubscribed}
                channelId={channel?._id}
                edit={true}
            />
        )}

        <ChannelNavigate edit={true}/>
        <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
            <Outlet/>
        </div>
        </>
    )
}

export default EditChannel