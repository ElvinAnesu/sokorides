"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login(){
    const router = useRouter()
    const [phonenumber, setPhonenumber] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const login = async(e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await fetch("/api/auth",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                phonenumber,
                password
            })
        })
        const data  = await response.json()
        if(data.success){
            setIsLoading(false)
            router.push("/dashboard")
        }else{
            setIsLoading(false)
            alert(data.message)
        }
        
    }

    return(
        <div className="w-full h-screen flex items-center justify-center px-16">
            <form className="flex flex-col gap-2 bg-gray-200 p-4 rounded shadow w-full md:w-1/4" onSubmit={(e) => login(e)}>
                <h1 className="font-semibold text-xl text-gray-900 ">Login</h1>
                <input className="border border-gray-900 rounded w-full bg-transparent p-2 text-sm"
                    placeholder="phone number"
                    onChange={(e)=>setPhonenumber(e.target.value)} 
                    required/>
                <input className="border border-gray-900  rounded w-full bg-transparent p-2 text-sm"
                    placeholder="password"
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)} 
                    required/>
                <button className="bg-gray-900 text-white p-2 rounded text-sm" type="submit">Login</button>
            </form>
        </div>
    )
}