"use client"
import { useEffect, useState } from "react"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"


export default function CreateNew({params}){

    const router = useRouter()
    const {_id} = params
    const [firstname,setFirstname] = useState()
    const [surname, setSurname] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [role, setRole] = useState()
    const [fetchfailed, setFetchfailed] = useState(false)
    const [edit, setEdit] = useState(false)
    const [isloading, setIsLoading] = useState(false)

    const updateUser = async(e) => {
        setIsLoading(true)
        e.preventDefault()
        const response = await fetch(`/api/users/${_id}`,{
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                surname,
                firstname,
                phonenumber,
                role,
            })
        })
        const data = await response.json()
        if(data.success){
            setIsLoading(false)
            alert(data.message)
        }else{
            setIsLoading(false)
            alert(data.message)
        }

    }
    const getUser = async()=>{
        setIsLoading(true)
        const response = await fetch(`/api/users/${_id}`,{
            method:"GET",
            headers:{"Content-type":"application/json"},
        })
        const data = await response.json()
        if(data.success){
            setFirstname(data.user.firstname)
            setSurname(data.user.surname)
            setPhonenumber(data.user.phonenumber)
            setRole(data.user.role)
            setIsLoading(false)
        }else{
            setFetchfailed(true)
            setIsLoading(false)
            alert(data.message)
        }
    }

    useEffect(()=>{
       getUser()
    },[])
    return(
        <div className="w-full h-full flex flex-col gap-4 p-4 bg-gray-200 rounded">
            <div className="flex w-full items-center justify-between">
                <div className="flex gap-2 items-center">
                    <button onClick={()=> router.back()}><ArrowLeftIcon className="w-6 h-6"/></button>
                    <h1 className="text-sm font-semibold">User Information</h1>
                </div>
                <button className="px-4 py-2 border border-gray-900 rounded" onClick={()=>setEdit(!edit)}>
                    {edit? "Cancel":"Edit"}
                </button>
            </div>
            {isloading?<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
                <div className="flex flex-col items-center justify-center  w-full h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>:
            <form className="flex flex-col md:grid md:grid-cols-2" onSubmit={(e)=>updateUser(e)}>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">First Name</h1>
                    <input className="border border-gray-900 rounded bg-transparent w-full p-2 test-sm"
                        placeholder="first name"
                        required 
                        onChange={(e)=>setFirstname(e.target.value)}
                        disabled ={!edit}
                        value={firstname}
                        />
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Surname</h1>
                    <input className="border border-gray-900  rounded bg-transparent w-full p-2 test-sm"
                        placeholder="surname" 
                        required
                        onChange={(e)=>setSurname(e.target.value)}
                        disabled ={!edit}
                        value={surname}/>
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Phone Number</h1>
                    <input className="border border-gray-900  rounded bg-transparent w-full p-2 test-sm"
                        placeholder="phone number" 
                        type="text"
                        required
                        onClick={(e)=>setPhonenumber(e.target.value)}
                        disabled ={!edit}
                        value={phonenumber}/>
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Role</h1>
                    <select className="border border-gray-900  rounded bg-transparent w-full p-2 test-sm" 
                        onChange={(e)=>setRole(e.target.value)}>
                        <option className="bg-gray-900 text-white">--select role--</option>
                        <option className="bg-gray-900 text-white" value={"owner"}>owner</option>
                        <option className="bg-gray-900 text-white" value={"admin"}>admin</option>
                    </select>
                </div>
                <div className="flex flex-col p-2">
                    <button className="w-full bg-gray-900 text-white rounded p-2">Update</button>
                </div>
            </form>}
        </div>
    )
}