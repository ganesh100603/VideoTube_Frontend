import React, { useState } from "react";
import {Link} from "react-router-dom"
import {Logo} from "../components";

function TermsAndConditions(){
    const [isChecked,setIsChecked] = useState(false)

    return(
        <div className="container mx-auto flex justify-center items-center h-screen">
            <div className="bg-black border border-slate-800 text-white rounded-lg p-8 shadow-lg">
                <div className="mb-5">
                    <Logo/>
                </div>
                <h1 className="text-2xl font-bold mb-4">
                    Terms & Conditions
                </h1>

                <div className="mb-4">
                    <ul>
                        <li className="mb-2">
                            This Project is just a demo product to showcase my
                            skills.
                        </li>
                        <li className="mb-2">
                            It is not an actual product and it's not under any juridiction or
                            any organisation.
                        </li>
                        <li className="mb-2">
                            Do not upload any explicit content that can harm others. 
                        </li>
                        <li className="mb-2">
                            Do not upload any larger files that is greater than 100mb
                        </li>
                    </ul>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                    type="checkbox"
                    id="termsCheckbox"
                    checked={isChecked}
                    onChange={()=>setIsChecked(!isChecked)}
                    className="mr-2 transform scale-125"
                    />

                    <label 
                    htmlFor="termsCheckbox"
                    className="font-bold"
                    >
                        I agree to the Terms & Conditions
                    </label>
                </div>
                <div>
                    {isChecked&&(
                        <Link
                        to="/"
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                        >
                        Continue
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions