"use client"
import { useRouter } from "next/navigation"


export default function UsersTable(){
    const router = useRouter()

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
                        {[1,2,3].map((car,index)=>(
                            <tr className="border-b border-gray-500" key={index}>
                                <td className="px-2 rounded-s-full text-sm">Kakomo</td>
                                <td className="text-sm">Elvin</td>
                                <td className="text-sm">0775953491</td>
                                <td className="text-sm">admin</td>
                                <td className="px-2 rounded-e-full">action</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}