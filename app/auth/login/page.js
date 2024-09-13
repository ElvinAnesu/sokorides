"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login(){
    const router = useRouter()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const login = (e) => {
        e.preventDefault();
        router.push("/dashboard")
    }
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <form className="flex flex-col gap-2 bg-black p-4 rounded shadow w-1/4" onSubmit={(e) => login(e)}>
                <h1 className="font-semibold text-xl">Login</h1>
                <input className="border rounded w-full bg-transparent p-2 text-sm"
                    placeholder="email"
                    onChange={(e)=>setEmail(e.target.value)} 
                    required/>
                <input className="border rounded w-full bg-transparent p-2 text-sm"
                    placeholder="email"
                    onChange={(e)=>setPassword(e.target.value)} 
                    required/>
                <button className="bg-blue-500 p-2 rounded text-sm" type="submit">Login</button>
            </form>
        </div>
    )
}