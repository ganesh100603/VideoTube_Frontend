import React from "react";
import { FiVideo } from "react-icons/fi";
import {Link} from "react-router-dom"

function Logo({size="30"}){
    return(
        <>
        <Link to={'/'} className="flex gap-2 items-center"> 
            <FiVideo size={size} color="#A855F7" />
            <h2 className="text-xl text-purple-500 font-extrabold">StremioX</h2>
        </Link>
        </>
    )
}
export default Logo