"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons"


export default function UsersTable(){
    const router = useRouter()
    const [users, setUsers] = useState([])

    const getUsers = async()=> {
        const response = await fetch("/api/users",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })
        const data = await response.json()
        if(data.success){
            setUsers(data.users)
        }
    }

    const deleteUser = async(_id) => {
        const response = await fetch(`/api/users/${_id}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
        })
        const data = await response.json()
        if(data.success){
            alert(data.message)
        }else{
            alert(data.message)
        }
    }
    useEffect(()=>{
        getUsers()
    },[])

    return(
        <div className="flex flex-col w-full h-full gap-2">
            <div className="flex w-full items-center justify-end">
                <button className="border rounded px-4 py-2" onClick={() => router.push("/dashboard/users/createnew")}>Add New</button>
            </div>
            <div className="w-full h-full bg-[#0a0a0a] rounded p-4">
                <table className="w-full">
                    <tbody>
                        <tr className="px-2 bg-black rounded-full">
                            <td className="px-2 rounded-s-full text-sm font-semibold">Surname</td>
                            <td className="text-sm font-semibold">Firstname</td>
                            <td className="text-sm font-semibold">Phonenumber</td>
                            <td className="text-sm font-semibold">role</td>
                            <td className="px-2 rounded-e-full text-sm font-semibold">Action</td>
                        </tr>
                        {users.map((user,index)=>(
                            <tr className="border-b border-gray-500" key={index}>
                                <td className="px-2 rounded-s-full text-sm">{user.surname}</td>
                                <td className="text-sm">{user.firstname}</td>
                                <td className="text-sm">{user.phonenumber}</td>
                                <td className="text-sm">{user.role}</td>
                                <td className="px-2 rounded-e-full flex items-center justify-around">
                                    <button onClick={()=>router.push(`/dashboard/users/${user._id}`)}><EyeOpenIcon /></button>
                                    <button onClick={()=>deleteUser(user._id)}><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}