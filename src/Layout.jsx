import React from "react";
import { Navbar,SideBar } from "./components";
import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <>
            <Navbar/>
            <div className="sm:flex flex-none">
                <div>
                    <SideBar/>
                </div>
                <div className="sm:flex-1">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default Layout