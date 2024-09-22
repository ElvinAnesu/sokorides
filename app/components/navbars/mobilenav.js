import Link from "next/link"
import { Cross1Icon } from "@radix-ui/react-icons"

export default function MobileNav({onClose}){
    return(
        <div className="absolute h-full top-0 left-0 bg-gray-300 flex flex-col gap-4 p-4 z-10 w-3/4">
            <div className="flex items-center justify-end">
                <button className="border border-gray-900 rounded p-2" onClick={onClose}><Cross1Icon /></button>
            </div>
            <ul className="flex flex-col gap-4 text-sm">
                <li className="hover:underline"><Link href="#">All</Link></li>
                <li className="hover:underline">< Link href="#">Latest</Link></li>
                <li className="hover:underline"><Link href="#">Hybrid</Link></li>
                <li className="hover:underline"><Link href="#">SUV</Link></li>
                <li className="hover:underline"><Link href="#">Fuel Saver</Link></li>
            </ul>
            <Link className="border border-gray-900 rounded p-2 w-full" href={"https://wa.me/14157386102"}>Track Shipment</Link>
    </div>
    )
}