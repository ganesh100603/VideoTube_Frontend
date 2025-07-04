import React, { useEffect, useState } from "react";
import { Container,
        DeleteConfirmation,
        HeaderSection,
        Navbar,
        Spinner,
        StatsSection,
        VideoTable,
        EditVideo,
        UploadVideo
 } from "../components";    
import { useDispatch,useSelector } from "react-redux";
import { getChannelStats,getChannelVideos } from "../store/Slices/dashboardSlice";
import { deleteVideo } from "../store/Slices/videoSlice";

function AdminDashboard(){
    const username = useSelector((state)=>state.auth?.userData?.username)
    const dashboard = useSelector((state)=>state.dashboard?.channelStats)
    const videos = useSelector((state)=>state.dashboard?.channelVideos)
    const uploaded = useSelector((state)=>state.video.uploaded)
    const publishToggled = useSelector((state)=>state.video?.publishToggled)
    const deleting = useSelector((state)=>state.video?.loading)

    const dispatch = useDispatch()
    const [videoDetails,setVideoDetails] = useState(null)
    const [popUp,setPopUp] = useState({
        uploadVideo:false,
        editVideo:false,
        deleteVideo:false
    })

    const handleDeleteVideo = async() => {
        dispatch(deleteVideo(videoDetails._id))
        setPopUp((prev)=>({
            ...prev,
            deleteVideo:!prev.deleteVideo
        }))
    }

    useEffect(()=>{
        dispatch(getChannelStats())
    },[dispatch])   

    useEffect(()=>{
        dispatch(getChannelVideos())
    },[dispatch,uploaded,publishToggled,deleting])

    window.scrollTo(0,0)

    return(
        <>
            <Navbar/>
            <Container>
                <div className="w-full relative h-screen text-white space-y-5 z-10 py-4 px-1">
                    {popUp.uploadVideo && (
                        <UploadVideo setUploadVideoPopUp={setPopUp}/>
                    )}
                {popUp.editVideo&&(
                    <div className="w-full flex justify-center top-24 fixed z-20">
                        <EditVideo
                        setEditVideoPopUp={setPopUp}
                        title={videoDetails?.title}
                        description={videoDetails?.description}
                        videoId={videoDetails?._id}
                        />
                    </div>
                )}

                {popUp.deleteVideo&&(
                    <div className="w-full fixed top-52 flex justify-center z-20">
                        <DeleteConfirmation
                        video={true}
                        onCancel={()=>setPopUp((prev)=>({
                            ...prev,
                            deleteVideo:!prev.deleteVideo   
                        }))}
                        onDelete={handleDeleteVideo}
                        />
                    </div>
                )}

                {deleting &&(
                    <div className="w-full fixed top-2 flex justify-center z-20">
                        <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                            <Spinner/>
                            <span className="text-md font-bold">
                                Deleting Video...
                            </span>
                        </div>
                    </div>
                )}

                <HeaderSection
                username={username}
                setPopUp={setPopUp}
                />

                {dashboard&&<StatsSection dashboard={dashboard}/>}

                <VideoTable
                videos={videos}
                setPopUp={setPopUp}
                setVideoDetails={setVideoDetails}
                />
                </div>
            </Container>
        </>
    )
}

export default AdminDashboard