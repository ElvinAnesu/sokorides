"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login(){
    const router = useRouter()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const login = () => {
        
    }
    return(
        <div className="w-full h-screen flex items-center justify-center ">
            
            <div className="flex flex-col gap-2 bg-black p-4 rounded shadow w-1/4">
                <h1 className="font-semibold text-xl">Login</h1>
                <input className="border rounded w-full bg-transparent p-2 text-sm"
                    placeholder="email"
                    onChange={(e)=>setEmail(e.target.value)} />
                <input className="border rounded w-full bg-transparent p-2 text-sm"
                    placeholder="email"
                    onChange={(e)=>setEmail(e.target.value)} />
                <button className="bg-blue-500 p-2 rounded text-sm" onClick={login}>Login</button>
            </div>
        </div>
    )
}