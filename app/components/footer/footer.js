"use client"
import Link from "next/link"


export default function Footer(){
    return(
        <div className="w-full flex items-center justify-between text-xs p-4">
            <p>&copy;2024 sokorides.com. All rights reserved</p>
            <p>created by <Link href="#">codeslayer</Link></p>
        </div>
    )
}