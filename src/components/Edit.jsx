import React, { useState } from "react";

function Edit({initialContent,onCancel,onSave}){
    const [editedContent,seteditedContent] = useState(initialContent)

    const handleSave = () =>{
        onSave(editedContent)
    }

    return(
        <div className="w-full text-sm">
            <input 
                className="bg-[#222222] outline-none border-b w-3/4 p-2"
                value={editedContent}
                autoFocus
                onChange={(e)=>seteditedContent(e.target.value)}
            />
            <div className="space-x-4 mt-3 w-3/4 inline-flex justify-end items-center">
                <span className="bg-[#222222] py-1 px-3 font-normal rounded-lg hover:bg-black cursor-pointer" 
                onClick={onCancel}>
                    Cancel
                </span>
                <button className="bg-[#222222] py-1 px-3 font-normal rounded-lg hover:bg-black cursor-pointer" 
                onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default Edit