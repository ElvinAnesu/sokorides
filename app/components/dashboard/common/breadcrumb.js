"use client"
import { lusitana } from "@/app/fonts/fonts";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function BreadCrumb({ title }) {
    const router  = useRouter()
    return (
			<div className="w-full flex p-2 rounded bg-purple-900 items-center gap-2">
				<button className="text-white border border-white rounded-full p-1" onClick={()=>router.back()}>
					<ChevronLeftIcon className="w-4 h-4" />
				</button>
				<h1 className={`${lusitana.className} text-white font-semibold`}>
					{title}
				</h1>
			</div>
		);
}