"use client"
import Link from "next/link"


export default function Sidebar(){
    return(
        <div className="hidden md:flex md:flex-col gap-4">
            <h1 className="font-semibold text-sm">catalogue</h1>
            <ul className="flex flex-col gap-2 text-sm">
                <li className="hover:underline"><Link href="/store/products">All</Link></li>
                <li className="hover:underline">< Link href="/store/products/latest">Latest</Link></li>
                <li className="hover:underline"><Link href="/store/products/hybrid">Hybrid</Link></li>
                <li className="hover:underline"><Link href="/store/products/suv">SUV</Link></li>
                <li className="hover:underline"><Link href="/store/products/fuel saver">Fuel Saver</Link></li>
            </ul>
        </div>
    )
}