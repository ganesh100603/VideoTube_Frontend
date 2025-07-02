import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { NoVideoFound,VideoList } from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { getAllVideos,makeVideosNull } from "../store/Slices/videoSlice";
import { FaFilter } from "react-icons/fa";
import {IoCloseCircleOutline} from "../components/icons"
import { useParams,useSearchParams } from "react-router-dom";

function SearchVideos(){
    const loading = useSelector((state)=>state.video?.loading)
    const videos = useSelector((state)=>state.video?.videos)
    const dispatch = useDispatch()
    const {query} = useParams()
    const [filterOpen,setFilterOpen] = useState(false)
    const [searchParams,setSearchParams] =useSearchParams()

    useEffect(()=>{
        const sortType = searchParams.get("sortType")
        const sortBy = searchParams.get("sortBy")
        dispatch(
            getAllVideos({
                query,
                sortBy,
                sortType
            })
        )
        setFilterOpen(false)
        return ()=>dispatch(makeVideosNull())
    },[dispatch,query,searchParams])

    const handleSortParams = (newSortBy,newSortType='asc')=>{
        setSearchParams({sortBy:newSortBy,sortType:newSortType})
    }

    if(videos?.totalDocs === 0){
        return <NoVideoFound/>
    }

    if(loading){
        return <HomeSkeleton/>
    }

    return(
        <>
            <div
            className="w-full h-10 flex items-center justify-end font-bold cursor-pointer px-8 gap-1 relative"
            onClick={()=>setFilterOpen((prev)=>!prev)}
            >
                <FaFilter
                size={20}
                className="text-purple-500 hover:text-purple-800"
                />
                <span className="text-white hover:text-purple-500">
                    Filters
                </span>
                
            
            
            
                {filterOpen&&(
                    // <div className="w-full absolute bg-transparent">
                        <div className="absolute top-full right-0 mt-2 w-72 border border-slate-800 rounded bg-[#222222] z-50 p-5
                        ">
                            <h1 className="font-semibold text-lg">
                                Search Filters
                            </h1>
                            <IoCloseCircleOutline
                            size={25}
                            className="absolute right-5 top-5 cursor-pointer"
                            onClick={()=>setFilterOpen((prev)=>!prev)}
                            />

                            <table className="mt-4">
                                <tr className="w-full text-start border-b">
                                    <th>SortBy</th>
                                </tr>
                                <tr className="flex flex-col text-slate-400 gap-2 cursor-pointer">
                                    <td
                                    onClick={()=>handleSortParams("createdAt","desc")}
                                    >
                                        Upload date{" "}
                                        <span className="text-xs">
                                            (Latest)
                                        </span>
                                    </td>
                                    
                                    <td
                                    onClick={()=>handleSortParams("createdAt","asc")}
                                    >
                                        Upload date{" "}
                                        <span className="text-xs">
                                            (Oldest)
                                        </span>
                                    </td>
                                    
                                    <td
                                    onClick={()=>handleSortParams("views","asc")}
                                    >
                                        View Count{" "}
                                        <span className="text-xs">
                                            (Low to High)
                                        </span>
                                    </td>
                                    
                                    <td
                                    onClick={()=>handleSortParams("views","desc")}
                                    >
                                        View Count{" "}
                                        <span className="text-xs">
                                            (High to Low)
                                        </span>
                                    </td>
                                    
                                    <td
                                    onClick={()=>handleSortParams("duration","asc")}
                                    >
                                        Duration{" "}
                                        <span className="text-xs">
                                            (Low to High)
                                        </span>
                                    </td>
                                    
                                    <td
                                    onClick={()=>handleSortParams("duration","desc")}
                                    >
                                        Duration{" "}
                                        <span className="text-xs">
                                            (High to Low)
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    // </div>
                )}
            </div>
            {/* <div className="w-full text-white"> */}
                <div className="grid h-screen xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-white overflow-y-scroll">
                    {videos&&(
                        videos?.docs?.map((video)=>(
                            <VideoList
                            key={video?._id}
                            avatar={video?.ownerDetails?.avatar}
                            duration={video?.duration}
                            title={video?.title}
                            thumbnail={video?.thumbnail?.url}
                            createdAt={video?.createdAt}
                            views={video?.views}
                            channelName={video?.ownerDetails.username}
                            videoId={video?._id}
                            />
                        ))
                    )}
                </div>
            {/* </div> */}
        </>
    )
}
export default SearchVideos