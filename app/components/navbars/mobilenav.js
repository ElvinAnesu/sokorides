import Link from "next/link"
import { Cross1Icon } from "@radix-ui/react-icons"

export default function MobileNav({onClose}){
    return(
        <div className="absolute h-full top-0 left-0 bg-black flex flex-col gap-4 p-4 z-10 w-3/4">
            <div className="flex items-center justify-end">
                <button className="border rounded p-2" onClick={onClose}><Cross1Icon /></button>
            </div>
            <ul className="flex flex-col gap-4 text-sm">
                <li className="hover:underline"><Link href="/store/products">All</Link></li>
                <li className="hover:underline">< Link href="/store/products/latest">Latest</Link></li>
                <li className="hover:underline"><Link href="/store/products/hybrid">Hybrid</Link></li>
                <li className="hover:underline"><Link href="/store/products/suv">SUV</Link></li>
                <li className="hover:underline"><Link href="/store/products/fuel saver">Fuel Saver</Link></li>
            </ul>
            <button className="border rounded p-2 w-full">Rent to buy</button>
            <button className="border rounded p-2 w-full">Track Shipment</button>
    </div>
    )
}