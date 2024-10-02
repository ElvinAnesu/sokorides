"use client"
import { Cross1Icon , MagnifyingGlassIcon} from "@radix-ui/react-icons"
import { useState } from "react";

export default function MobileNav({ onClose }) {
    const [searchQuery, setSearchQuery] = useState()
    return (
			<div className="absolute h-full top-0 left-0 bg-purple-900 flex flex-col gap-4 p-4 z-10 w-3/4 md:w-1/5">
				<div className="flex items-center justify-end">
					<button
						className="border border-white text-white rounded p-2"
						onClick={onClose}
					>
						<Cross1Icon />
					</button>
				</div>
				<div className="relative w-full px-4 md:hidden">
					<input
						className="border border-white rounded-full bg-transparent p-2 text-sm w-full text-white"
						placeholder="search for cars"
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button
						className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white"
						onClick={() => router.push(`/store/products/${searchQuery}`)} // Replace with your search logic
					>
						<MagnifyingGlassIcon className="w-6 h-6" />
					</button>
				</div>
				<button className="border border-white text-white rounded p-2 w-full md:hidden">
					search
				</button>
				<ul className="flex flex-col text-white text-xs font-semibold gap-4">
					<li>
						<button>Hybrid</button>
					</li>
					<li>
						<button>SUV</button>
					</li>
					<li>
						<button>Fuel Saver</button>
					</li>
					<li>
						<button>Latest</button>
					</li>
				</ul>
			</div>
		);
}