"use client"
import { useState } from "react"


export default function ViewCustomer({params}){
    const {_id} = params
    const [surname, setSurname] = useState()
    const [firstname, setFirstname] = useState()
    const [phonenumber, setPhonenumber]= useState()
    const [email, setEmail] = useState()
    const [address,setAddress] = useState()
    const [edit, setEdit] = useState(false)
    const [fetchingfailed, setFetchingFailed] = useState(false)
    const [errorMessage, setErrormessage] = useState()

    const editCustomer = async(e) => {
        e.preventDefault()
        const response = await fetch(`/api/customers/${_id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                surname,
                firstname,
                phonenumber,
                email,
                address
            })
        })

        const data = await response.json()

        if(data.success){
            alert(data.message)
        }else{
            alert(data.message)
        }
    }

    const getUser = async() => {
        const response = await fetch(`/api/customers/${_id}`,{
            method : "GET",
            headers: {"Content-Type":"application/json"}
        })

        const data = await response.json()

        if(data.success){
            setFirstname(data.customer.firstname)
            setSurname(data.customer.surname)
            setAddress(data.customer.address)
            setPhonenumber(data.customer.phonenumber)
            setEmail(data.customer.email)
        }else{
            setErrormessage(data.message)
            setFetchingFailed(true)
        }
    }

    useState(()=>{
        getUser()
    },[])
    return(
        <div className="w-full h-full flex flex-col gap-4 p-4 bg-gray-200 rounded">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-sm font-semibold">Customer Info</h1>
                <button  className="rounded border-gray-900 items-center jusitfy-center px-4 border rounded py-2"
                    onClick={()=>setEdit(!edit)}>
                    {edit? "Cancel":"Edit"}
                </button>
            </div>
            <form className="flex flex-col md:grid md:grid-cols-2" onSubmit={(e) => editCustomer(e)}>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">First Name</h1>
                    <input className="border border-gray-900  rounded bg-transparent w-full p-2 test-sm"
                        placeholder="first name"
                        onChange={(e)=>setFirstname(e.target.value)} 
                        required
                        value={firstname}
                        disabled={!edit}/>
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Surname</h1>
                    <input className="border border-gray-900  rounded bg-transparent w-full p-2 test-sm"
                        placeholder="surname" 
                        onChange={(e)=>setSurname(e.target.value)}
                        required
                        value={surname}
                        disabled={!edit}/>
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Phone Number</h1>
                    <input className="border border-gray-900  rounded bg-transparent w-full p-2 test-sm"
                        placeholder="phone number" 
                        onChange={(e)=>setPhonenumber(e.target.value)}
                        required
                        value={phonenumber}
                        disabled={!edit}/>
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Email</h1>
                    <input className="border border-gray-900  rounded bg-transparent w-full p-2 test-sm"
                        placeholder="phone number" 
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        disabled={!edit}
                        />
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Address</h1>
                    <input className="border border-gray-900  rounded bg-transparent w-full p-2 test-sm"
                        placeholder="address" 
                        onChange={(e)=>setAddress(e.target.value)}
                        required
                        value={address}
                        disabled={!edit}/>
                </div>
                <div></div>
                <div className="flex flex-col p-2">
                    {edit && <button className="w-full bg-gray-900 text-white rounded p-2">Create</button>}
                </div>
            </form>
        </div>
    )
}