"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { EyeOpenIcon, TrashIcon, PlusIcon } from "@radix-ui/react-icons"

const PAGE_SIZE = 10

export default function CustomersTable(){
    const router = useRouter()
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState(null)
    const [fetchingfailed, setFetchingFailed] = useState(false)
    const [errorMessage, setErrormessage] = useState()

    const getCustomers = async() => {
        const response = await fetch(`/api/customers/?page=${page}&searchQuery=${searchQuery}&pageSize=${PAGE_SIZE}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })

        const data = await response.json()

        if(data.success){
            setCustomers(data.customers)
            console.log(data.customers)
        }else{
            setErrormessage(data.message)
            setFetchingFailed(true)
        }
    }

    const deleteCustomer = async(_id)=>{
        const response = await fetch(`/api/customers/${_id}`,{
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
        getCustomers()
    },[])

    return(
        <div className="flex flex-col w-full h-full gap-2">
            <div className="flex w-full items-center justify-end">
                <button className="border border-gray-900 rounded px-4 py-2 flex items-center gap-2" onClick={() => router.push("/dashboard/customers/createnew")}>
                <PlusIcon /> Add New
                </button>
            </div>
            <div className="w-full h-full bg-gray-200 rounded p-4">
                {fetchingfailed? <div className="w-full h-full items-center justify-center">
                    <h1>{errorMessage}</h1>
                </div>:
                <table className="w-full">
                <tbody>
                    <tr className="px-2 bg-gray-900 text-white rounded-full">
                        <td className="px-2 rounded-s-full text-sm font-semibold">Surname</td>
                        <td className="text-sm font-semibold">Firstname</td>
                        <td className="text-sm font-semibold">Phonenumber</td>
                        <td className="px-2 rounded-e-full text-sm font-semibold">Action</td>
                    </tr>
                    {customers.map((customer,index)=>(
                        <tr className="border-b border-gray-500" key={index}>
                            <td className="px-2 rounded-s-full text-sm">{customer.surname}</td>
                            <td className="text-sm">{customer.firstname}</td>
                            <td className="text-sm">{customer.phonenumber}</td>
                            <td className="px-2 rounded-e-full flex items-center justify-around">
                                <button onClick={()=>{router.push(`/dashboard/customers/${customer._id}`)}}><EyeOpenIcon /></button>
                                <button onClick={()=>{deleteCustomer(customer._id)}}><TrashIcon /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
            </div>
        </div>
    )
}