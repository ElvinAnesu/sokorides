"use client"
import { useRouter } from "next/navigation"


export default function ShipmentsTable(){
    const router = useRouter()

    return(
        <div className="flex flex-col w-full h-full gap-2">
            <div className="flex w-full items-center justify-end">
                <button className="border rounded px-4 py-2" onClick={() => router.push("/dashboard/shipments/createnew")}>Add New</button>
            </div>
            <div className="w-full h-full bg-[#0a0a0a] rounded p-4">
                <table className="w-full">
                    <tbody>
                        <tr className="px-2 bg-black rounded-full">
                            <td className="px-2 rounded-s-full text-sm font-semibold">Customer</td>
                            <td className="text-sm font-semibold">Phone Number</td>
                            <td className="text-sm font-semibold">Purchased Vehicle</td>
                            <td className="text-sm font-semibold">Price</td>
                            <td className="px-2 rounded-e-full text-sm font-semibold">Action</td>
                        </tr>
                        {[1,2,3,4,5,6,7,8,9,0].map((car,index)=>(
                            <tr className="border-b border-gray-500" key={index}>
                                <td className="px-2 rounded-s-full text-sm">Elvin Kakomo</td>
                                <td className="text-sm">0775953491</td>
                                <td className="text-sm">Honda Vezel</td>
                                <td className="text-sm">USD8000</td>
                                <td className="px-2 rounded-e-full">acrion</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}