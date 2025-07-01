import React, { useId } from "react";

const Input2 = React.forwardRef(function Input2(
    {label, type="text", placeholder, className = "", ...props},
    ref
){
    const id = useId()
    return(
        <div className="w-full">
            {label&&(
                <label>
                    {label}
                </label>
            )}
            <input 
                type={type}
                placeholder={placeholder}
                className={`w-full p-2 border bg-transparent outline-none focus:bg-[#222222] ${className}`}
                {...props}
                ref={ref}
                id={id}
            />
        </div>
    )
})

export default Input2