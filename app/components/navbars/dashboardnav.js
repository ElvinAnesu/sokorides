"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashBoardNav(){
    const router = useRouter()
    return(
        <div className="flex flex-col w-full h-full p-4 bg-black rounded">
            <ul className="flex flex-col gap-4 text-sm">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/dashboard/cars">Cars in stock</Link></li>
                <li><Link href="/dashboard/shipments">Shipments</Link></li>
                <li><Link href="/dashboard/customers">Customers</Link></li>
                <li><Link href="/dashboard/users">Users</Link></li>
                <li><button onClick={()=> router.push("/auth/login")}>Logout</button></li>
            </ul>
        </div>
    )
}