"use client"
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useState } from "react"
import MobileNav from "../navbars/mobilenav"


export default function MainHeader(){
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState()
    const [showMobileNav, setShowMobileNav] = useState(false)

    return( 
        <div className="flex w-full h-100 p-2 items-center justify-between">
            <div className="w-full md:hidden">
                <button className="md:hidden border rounded p-2" onClick={()=>setShowMobileNav(true)}>
                    <HamburgerMenuIcon />
                </button>     
            </div>         
            <div className="w-full flex gap-4 px-4">
                <button onClick={()=> router.push("/")}>
                    <h1 className="font-semibold text-xl">SOKORIDES</h1>
                </button>
                <ul className="hidden md:flex gap-2 items-center">
                    <li><button className="text-sm" onClick={()=> router.push("/store/products")}>All</button></li>
                    <li><button className="text-sm" onClick={()=> router.push("/store/products/latest")}>latest</button></li>
                </ul>
            </div>
            <div className="relative w-full px-4 hidden md:block">
                <input 
                    className="border border-gray-400 rounded-full bg-transparent p-2 text-sm w-full"
                    placeholder="search for cars"
                    onChange={(e)=> setSearchQuery(e.target.value)}/>
                <button 
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => router.push(`/store/products/${searchQuery}`)} // Replace with your search logic
                >
                    <MagnifyingGlassIcon className="w-6 h-6"/>
                </button>
            </div>
            <div className="w-full flex items-center justify-end px-4">
                <button className="flex border rounded-full py-2 px-4 border-gray-400  text-sm" onClick={()=> router.push("tel:+263775953491")}>
                    call now
                </button>
            </div>

            {showMobileNav && <MobileNav onClose={()=> setShowMobileNav(false)}/>}
        </div>
    )
}