"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { DashboardIcon, ListBulletIcon, RocketIcon, PersonIcon, AvatarIcon, ExitIcon } from "@radix-ui/react-icons"

export default function DashBoardNav(){
    const router = useRouter()
    const pathname = usePathname()

    return(
        <div className="flex flex-col w-full h-full p-4 shadow rounded bg-gray-200">
            <ul className="flex flex-col gap-4 text-sm">
                <li className={`p-2 rounded hover:bg-gray-900 hover:text-white ${pathname === "/dashboard" ? "bg-gray-900 text-white":""}`}>
                    <Link href="/dashboard" className="flex gap-2 items-center">
                        <DashboardIcon /> Dashboard
                    </Link>
                </li>
                <li className={`p-2 rounded hover:bg-gray-900 hover:text-white ${pathname === "/dashboard/cars" ? "bg-gray-900 text-white":""}`}>
                    <Link href="/dashboard/cars" className="flex gap-2 items-center">
                        <ListBulletIcon /> Cars in stock
                    </Link>
                </li>
                <li className={`p-2 rounded hover:bg-gray-900 hover:text-white ${pathname === "/dashboard/shipments" ? "bg-gray-900 text-white":""}`}>
                    <Link href="/dashboard/shipments" className="flex gap-2 items-center">
                    <RocketIcon /> Shipments
                    </Link>
                </li>
                <li className={`p-2 rounded hover:bg-gray-900 hover:text-white ${pathname === "/dashboard/customers" ? "bg-gray-900 text-white":""}`}>
                    <Link href="/dashboard/customers" className="flex gap-2 items-center">
                        <PersonIcon /> Customers
                    </Link>
                </li>
                <li className={`p-2 rounded hover:bg-gray-900 hover:text-white ${pathname === "/dashboard/users" ? "bg-gray-900 text-white":""}`}>
                    <Link href="/dashboard/users" className="flex gap-2 items-center">
                        <AvatarIcon /> Users
                    </Link>
                </li>
                <li className={`p-2 rounded hover:bg-gray-900 hover:text-white`}>
                    <button onClick={()=> router.push("/auth/login")} className="flex gap-2 items-center">
                    <ExitIcon /> Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}