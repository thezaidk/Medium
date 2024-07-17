import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, useState } from "react";
import { SignupInput } from "@the_zaid_k/medium-common";
import axios from "axios";
import { BACKEND_URL } from '../config'

export const Auth= ({type}: {type: "signup" | "signin"}) => {
    const navigate= useNavigate();
    const [postInputs, setPostInputs]= useState<SignupInput>({
        name: "",
        bio: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt.token);
            navigate("/blogs")
        } catch(e) {
            if (axios.isAxiosError(e)) {
                alert(e.response?.data?.error || "An error occurred");
            } else {
                console.error(e);
                alert("An unknown error occurred");
            }
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-4xl font-bold">
                        Create an account
                    </div>
                    <div className="text-slate-500 mt-2">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 text-blue-600" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-8 font-semibold">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Zaid Karigar" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} /> : null}

                    {type === "signup" ? <LabelledInput label="Bio" placeholder="I am a software developer..." onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            bio: e.target.value
                        }))
                    }} /> : null}

                    <LabelledInput label="Email" placeholder="zaid@gmail.com" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            email: e.target.value
                        }))
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="Password" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} />
                    <button 
                        onClick={sendRequest} 
                        type="button" 
                        className="relative inline-flex items-center justify-center p-4 px-6 py-3 mt-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-gray-900 rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gray-900 group-hover:translate-x-0 ease">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-gray-900 transition-all duration-300 transform group-hover:translate-x-full ease">{type === "signup" ? "Sign up" : "Sign in"}</span>
                            <span className="relative invisible">{type === "signup" ? "Sign up" : "Sign in"}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const LabelledInput= ({ label, placeholder, onChange, type }: LabelledInputType) => {
    return <div className="mb-3">
        <label className="block mb-1 text-sm font-medium">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}