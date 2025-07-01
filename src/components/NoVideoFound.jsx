import React from "react";
import { BsPlayBtnFill } from "./icons";

function NoVideoFound({text}){
    return(
        <div className="flex flex-col pb-20 items-center justify-center text-white h-screen">
            <BsPlayBtnFill
            size={45}
            className="text-purple-500"
            />
            <p className="mt-4 text-lg">There are no video available here.</p>
            <p className="">{text && text}</p>
        </div>
    )
}

export default NoVideoFound