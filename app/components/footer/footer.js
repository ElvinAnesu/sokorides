"use client"
import Link from "next/link"


export default function Footer(){
    return(
        <div className="w-full flex items-center justify-between text-xs p-4 absolute bottom-0">
            <p>&copy;2024 sokocars.com. All rights reserved</p>
            <p>created by <Link href="elvinkakomo.vercel.app">codeslayer</Link></p>
        </div>
    )
}