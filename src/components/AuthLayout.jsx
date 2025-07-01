import React, { useEffect } from "react";
import {useSelector} from "react-redux"
import {LoginPopUp} from "."
import { useNavigate } from "react-router-dom";

function AuthLayout({children,authentication}){
    const navigate = useNavigate()
    const authStatus = useSelector((state)=>state.auth.status)

    useEffect(()=>{
        if(!authentication&&authStatus !== authentication){
            return 
        }
    },[authentication,authStatus,navigate])

    if(authentication&&authStatus!==authentication){
        return <LoginPopUp/>
    }
    return children
}

export default AuthLayout
