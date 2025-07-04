import React from "react";
import { PiFilmReelFill,IoCloseCircleOutline,TiTick } from "./icons";
import {Spinner,Button} from ".";
import { useDispatch } from "react-redux";
import { updateUploadState } from "../store/Slices/videoSlice";

function UploadingVideo(
   { videoFileName,
    fileSize,
    setUploadVideoPopUp,
    uploaded}
){
    const dispatch = useDispatch()

    const handleCancelAndFinish = () => {
        setUploadVideoPopUp((prev=>({
            ...prev,
            uploadVideo:false
        })))
        dispatch(updateUploadState())
    }

    return(
        <>
            <div className="fixed left-0 top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
                <div className="w-96 p-3 text-white border outline-none rounded-lg space-y-5 border-slate-700 bg-black">
                    <div className="flex items-center justify-between">
                        <div>
                            {uploaded ?(
                                <h1 className="text-lg font-bold">
                                    Uploaded Video
                                </h1>
                            ):(
                                <h1 className="text=lg font-bold">
                                    Uploading Video...
                                </h1>
                            )}

                            <span className="text-xs text-slate-400">
                                Track your video uploading process.
                            </span>
                        </div>
                        <IoCloseCircleOutline
                        size={25}
                        className="cursor-pointer"
                        onClick={handleCancelAndFinish}
                        />
                    </div>
                    <div className="border flex justify-start items-center p-1">
                        <div className="mr-2">
                            <PiFilmReelFill
                            size={25}
                            className="text-purple-500"
                            />
                        </div>

                        <div>
                            <h1 className="text-sm font-semibold">
                                {videoFileName}
                            </h1>

                            <p className="text-sm">{fileSize} MB</p>

                            <div className="flex gap-2 items-center mt-2">
                                {uploaded?(
                                    <>
                                        <span className="text-sm flex items-center">
                                            <TiTick
                                            size={25}
                                            className="text-purple-500"
                                            />
                                            Uploaded Successfully
                                        </span>
                                    </>
                                ):(
                                    <>
                                        <Spinner/>
                                        <span className="text-xs">
                                            Loading...
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                        className="border flex-1 p-2"
                        onClick={handleCancelAndFinish}
                        > 
                            Cancel
                        </Button>
                        
                        <Button
                        className="flex-1 bg-purple-500 p-2"
                        textColor="text-black"
                        onClick={handleCancelAndFinish}
                        > 
                            Finish
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadingVideo