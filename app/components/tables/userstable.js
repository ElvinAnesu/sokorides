"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { EyeOpenIcon, TrashIcon, PlusIcon } from "@radix-ui/react-icons"


export default function UsersTable(){
    const router = useRouter()
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getUsers = async()=> {
        setIsLoading(true)
        const response = await fetch("/api/users",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })
        const data = await response.json()
        if(data.success){
            setIsLoading(false)
            setUsers(data.users)
        }else{
            setIsLoading(false)
        }
    }

    const deleteUser = async(_id) => {
        let confirmDelete =  confirm("Delete this user")
        if(confirmDelete){
            setIsLoading(true)
            const response = await fetch(`/api/users/${_id}`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"}
            })
            const data = await response.json()
            if(data.success){
                setIsLoading(false)
                alert(data.message)
                window.location.reload()
            }else{
                setIsLoading(false)
                alert(data.message)
            }
        }
    }
    useEffect(()=>{
        getUsers()
    },[])

    return(
        <div className="flex flex-col w-full h-full gap-2">
            <div className="flex w-full items-center justify-end">
                <button className="border border-gray-900 rounded px-4 py-2 flex items-center gap-2" onClick={() => router.push("/dashboard/users/createnew")}>
                    <PlusIcon />Add New</button>
            </div>
            <div className="w-full h-full bg-gray-200 rounded p-4">
                {isLoading? <div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
                    <div className="flex flex-col items-center justify-center  w-full h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </div>:
                <table className="w-full">
                    <tbody>
                        <tr className="px-2 bg-gray-900 text-white rounded-full">
                            <td className="px-2 rounded-s-full text-sm font-semibold">Surname</td>
                            <td className="text-sm font-semibold">Firstname</td>
                            <td className="text-sm font-semibold hidden md:table-cell">Phonenumber</td>
                            <td className="text-sm font-semibold">role</td>
                            <td className="px-2 rounded-e-full text-sm font-semibold">Action</td>
                        </tr>
                        {users.map((user,index)=>(
                            <tr className="border-b border-gray-500" key={index}>
                                <td className="px-2 rounded-s-full text-sm">{user.surname}</td>
                                <td className="text-sm">{user.firstname}</td>
                                <td className="text-sm hidden md:table-cell">{user.phonenumber}</td>
                                <td className="text-sm">{user.role}</td>
                                <td className="px-2 rounded-e-full flex items-center justify-around">
                                    <button onClick={()=>router.push(`/dashboard/users/${user._id}`)}><EyeOpenIcon /></button>
                                    <button onClick={()=>deleteUser(user._id)}><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}