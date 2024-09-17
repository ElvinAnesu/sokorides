"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons"


export default function ShipmentsTable(){
    const router = useRouter()
    const [shipments, setShipments] = useState([])

    const getShipments = async()=>{
        const response = await fetch("/api/shipments",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })
        const data = await response.json()
        if(data.success){
            setShipments(data.shipments)
        }else{
            alert(data.message)
        }
    }
    const deleteShipment = async(_id)=>{
        const response = await fetch(`/api/shipments/${_id}`,{
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
        getShipments()
    },[])

    return(
        <div className="flex flex-col w-full h-full gap-2">
            <div className="flex w-full items-center justify-end">
                <button className="border border-gray-900 rounded px-4 py-2" onClick={() => router.push("/dashboard/shipments/createnew")}>Add New</button>
            </div>
            <div className="w-full h-full bg-gray-200 rounded p-4">
                <table className="w-full">
                    <tbody>
                        <tr className="px-2 bg-gray-900 text-white rounded-full">
                            <td className="px-2 rounded-s-full text-sm font-semibold">Customer</td>
                            <td className="text-sm font-semibold hidden md:table-cell">Phone Number</td>
                            <td className="text-sm font-semibold hidden md:table-cell">Purchased Vehicle</td>
                            <td className="text-sm font-semibold hidden md:table-cell">Price</td>
                            <td className="px-2 rounded-e-full text-sm font-semibold">Action</td>
                        </tr>
                        {shipments.map((shipment,index)=>(
                            <tr className="border-b border-gray-500" key={index}>
                                <td className="px-2 rounded-s-full text-sm">{shipment.customername}</td>
                                <td className="text-sm hidden md:table-cell">{shipment.customerphone}</td>
                                <td className="text-sm hidden md:table-cell">{shipment.purchaseditem}</td>
                                <td className="text-sm hidden md:table-cell">{shipment.price}</td>
                                <td className="px-2 rounded-e-full flex items-center justify-around">
                                    <button onClick={()=>router.push(`/dashboard/shipments/${shipment._id}`)}><EyeOpenIcon/></button>
                                    <button onClick={()=>deleteShipment(shipment._id)}><TrashIcon/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}