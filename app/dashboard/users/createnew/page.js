"use client"
import { useState } from "react"


export default function CreateNew(){

    const [firstname,setFirstname] = useState()
    const [surname, setSurname] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [role, setRole] = useState()
    const [password, setPassword] = useState()

    const createUser = async(e) => {
        e.preventDefault()
        const response = await fetch("/api/users",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                surname,
                firstname,
                phonenumber,
                role,
                password
            })
        })
        const data = await response.json()
        if(data.success){
            alert(data.message)
        }else{
            alert(data.message)
        }

    }

    return(
        <div className="w-full h-full flex flex-col gap-4 p-4 bg-gray-200 rounded">
            <h1 className="text-sm font-semibold">Create New User</h1>
            <form className="flex flex-col md:grid md:grid-cols-2" onSubmit={(e)=>createUser(e)}>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">First Name</h1>
                    <input className="border border-gray-900 rounded bg-transparent w-full p-2 test-sm"
                        placeholder="first name"
                        required 
                        onChange={(e)=>setFirstname(e.target.value)}/>
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Surname</h1>
                    <input className="border border-gray-900 rounded bg-transparent w-full p-2 test-sm"
                        placeholder="surname" 
                        required
                        onChange={(e)=>setSurname(e.target.value)}/>
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Phone Number</h1>
                    <input className="border border-gray-900  rounded bg-transparent w-full p-2 test-sm"
                        placeholder="phone number" 
                        type="text"
                        required
                        onClick={(e)=>setPhonenumber(e.target.value)}/>
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Role</h1>
                    <select className="border border-gray-900 rounded bg-transparent w-full p-2 test-sm" 
                        onChange={(e)=>setRole(e.target.value)}>
                        <option className="bg-black">--select role--</option>
                        <option className="bg-black" value={"owner"}>owner</option>
                        <option className="bg-black" value={"admin"}>admin</option>
                    </select>
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Password</h1>
                    <input className="border border-gray-900 rounded bg-transparent w-full p-2 test-sm"
                        placeholder="password"
                        type="password"
                        required
                        onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div></div>
                <div className="flex flex-col p-2">
                    <button className="w-full bg-gray-900 text-white rounded p-2">Create</button>
                </div>
            </form>
        </div>
    )
}