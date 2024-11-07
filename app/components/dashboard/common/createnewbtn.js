"use client"
import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function CreateNewBtn({ url }) {
    const router = useRouter()
    return (
			<button
				className="bg-purple-900 text-white  text-sm rounded px-2 py-2 flex items-center gap-1"
				onClick={() => router.push(url)}
			>
				<PlusIcon />
				Add New
			</button>
		);
}