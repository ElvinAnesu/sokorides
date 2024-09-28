"use client"
import { useState, useEffect } from "react"

export default function DashBoard(){

    const [shipments, setShipments] = useState([])
    const [totalShipment, setTotalShipments] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [totalCustomers, setTotalCustomers] = useState(0)

    const getShipments = async()=>{
        setIsLoading(true)
        const response = await fetch("/api/shipments?page=1&pageSize=5",{
            method:"GET",
            headers:{"Content-Type":"applications/json"}
        })
        const data = await response.json()
        if(data.success){
            setShipments(data.shipments)
            setTotalShipments(data.totalShipments)
            setIsLoading(false)
        }else{
            setIsLoading(false)
            alert(data.message)
        }
    }
    const getCustomers = async() => {
        const response = await fetch("api/customers",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })
        const data = await response.json()
        if(data.success){
            setTotalCustomers(data.totalCustomers)
        }else{
            alert(data.message)
        }
    }

    useEffect(()=>{
        getCustomers()
        getShipments()
    },[])

    return(
        <div className="w-full h-full p-4 gap-4 flex flex-col">
            <div className="w-full flex p-2 rounded bg-purple-900">
                <h1 className="text-white font-semibold">Dashboard</h1>
            </div>
            {isLoading? <div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
                <div className="flex flex-col items-center justify-center  w-full h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
                </div>
            </div>:
            <div className="bg-gray-200 flex flex-col md:grid md:grid-cols-3 gap-4 rounded p-2">
                <div className="hidden md:flex flex-col md:col-span-2">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-black text-2xl font-semibold">Latest Shipments</h1>
                        <p className="text-xs text-purple-900"><span className="text-black font-bold">Recently</span> added</p>
                        <div className="flex flex-col w-full h-full">
                            <table>
                                <tbody>
                                    <tr className="border-t border-b">
                                        <td className="py-1 text-sm font-semibold text-gray-500">Customer Name</td>
                                        <td className="py-1 text-sm font-semibold text-gray-500">Purchased Vehicle</td>
                                        <td className="py-1 text-sm font-semibold text-gray-500">Price</td>
                                        <td className="py-1 text-sm font-semibold text-gray-500">Origin</td>
                                        <td className="py-1 text-sm font-semibold text-gray-500">Desitination</td>
                                    </tr>
                                    {shipments.map((shipment, index)=>(
                                        <tr className="border-t border-b" key={index}>
                                            <td className="py-1 text-xs font-semibold">{shipment.customername}</td>
                                            <td className="py-1 text-xs font-semibold">{shipment.purchaseditem}</td>
                                            <td className="py-1 text-xs font-semibold">{shipment.price}</td>
                                            <td className="py-1 text-xs font-semibold">{shipment.origin}</td>
                                            <td className="py-1 text-xs font-semibold">{shipment.destination}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full h-full px-8">
                    <div className="rounded bg-purple-900 flex flex-col items-center justify-center gap-2 p-4">
                        <h1 className="text-white text-4xl">{totalCustomers}</h1>
                        <p className="text-white">total customers</p>
                    </div>
                    <div className="rounded bg-purple-900 flex flex-col items-center justify-center gap-2 p-4">
                        <h1 className="text-white text-4xl">{totalShipment}</h1>
                        <p className="text-white">total shipments</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}