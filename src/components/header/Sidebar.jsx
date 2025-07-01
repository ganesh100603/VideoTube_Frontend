import React from "react";
import {
    MdHistory,
    GrLike,
    FaHome,
    HiOutlineVideoCamera,
    IoFolderOutline,
    CiSettings,
    TbUserCheck
} from "../icons"
import { NavLink,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { MdLogout } from "react-icons/md";
import { userLogout } from "../../store/Slices/authSlice";

function SideBar(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = useSelector((state)=>state.auth?.userData?.username)

    const sideBarTopItems = [
        {
            icon:<FaHome size={25}/>,
            title:"Home",
            url:"/"
        },
        {
            icon:<GrLike size={25}/>,
            title:"Liked Videos",
            url:"/liked-videos"
        },
        {
            icon:<MdHistory size={25}/>,
            title:"History",
            url:"/history"
        },
        {
            icon:<IoFolderOutline size={25}/>,
            title:"Collections",
            url:"/collections"
        },
        {
            icon:<TbUserCheck size={25}/>,
            title:"Subscriptions",
            url:"/subscriptions"
        }
    ]

    const bottomBarItems = [
        {
            icon:<FaHome size={25}/>,
            title:"Home",
            url:"/"
        },
        {
            icon:<MdHistory size={25}/>,
            title:"History",
            url:"/history"
        },
        {
            icon:<IoFolderOutline size={25}/>,
            title:"Collections",
            url:"/collections"
        },
        {
            icon:<TbUserCheck size={25}/>,
            title:"Subscriptions",
            url:"/subscriptions"
        }
    ]

    const logout = async()=>{
        await dispatch(userLogout())
        navigate("/")
    }

    return(
        <>
            <div className="sm:block hidden">
                <div className="text-white lg:w-56 md:w-44 w-16 sm:p-3 p-2 border-r border-slate-600 h-screen flex flex-col justify-between">
                    <div className="flex flex-col gap-4 mt-5">
                        {sideBarTopItems.map((item)=>(
                            <NavLink
                            to={item.url}
                            key={item.title}
                            className={({isActive})=>isActive?"bg-purple-500" : ""}
                            > 
                                <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 
                                cursor-pointer py-1 px-2 border border-slate-600">   
                                    {item.icon}
                                    <span className="text-base hidden md:block">
                                        {item.title}
                                    </span>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                    <div className="space-y-4 mb-10">
                        {username&&(
                            <div
                            className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2
                            border border-slate-600"
                            onClick={()=>logout()}
                            > 
                                <MdLogout
                                size={25}
                                />
                                <span className="text-base hidden md:block">Logout</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2
                        border border-slate-600">
                            <CiSettings
                            size={25}
                            />
                            <span className="text-base hidden md:block">
                                Settings
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F]">
                {bottomBarItems.map((item)=>(
                    <NavLink
                    to={item.url}
                    key={item.title}
                    className={({isActive})=>isActive?"bg-purple-500" : ""}
                    >
                        <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
                            {item.icon}
                            <span className="item-sm">
                                {item.title}
                            </span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default SideBar