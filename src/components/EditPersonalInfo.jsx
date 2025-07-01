import React, { useEffect } from "react";
import {Input2,Button} from "."
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../store/Slices/authSlice";

function EditPersonalInfo(){
    const {
        handleSubmit,
        register,
        formState:{errors},
        setValue
    } = useForm()
    const dispatch = useDispatch()
    const auth = useSelector((state)=>state.auth?.userData)

    useEffect(()=>{
        setValue("fullname",auth?.fullname)
        setValue("email",auth?.email)
    },[auth,setValue])

    const saveChanges = (data) =>{
        dispatch(updateUserDetails(data))
    }

    const reset = (e) => {
        e.preventDefault()
        setValue("fullname",auth?.fullname)
        setValue("email",auth?.email)
    }

    return(
        <>
            <div className="w-full text-white flex justify-center items-center mt-5">
                <div className="bg-transparent p-5 border rounded shadow-lg w-full max-w-md">
                    <h2 className="text-lg font-bold mb-4">
                        Personal Information
                        <p className="font-light text-xs">
                            Update your personal details here.
                        </p>
                    </h2>
                    <form 
                    onSubmit={handleSubmit(saveChanges)}
                    className="space-y-4"
                    >
                        <div className="flex flex-col">
                            <Input2
                            label="Full Name"
                            type="text"
                            className="rounded border"
                            {...register("fullname",{
                                required:"Fullname is requried"
                            })}
                            />
                            {errors.fullname &&(
                                <span className="text-sm text-red-500">
                                    {errors.fullname.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <Input2
                            label="Email Address"
                            type="text"
                            className="rounded border"
                            {...register("email",{
                                required:"Email is requried"
                            })}
                            />
                            {errors.email &&(
                                <span className="text-sm text-red-500">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-evenly mt-4">
                            <Button onClick={(e)=>reset(e)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Reset
                            </Button>
                            <Button type="submit"
                            className="bg-purple-500 text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditPersonalInfo