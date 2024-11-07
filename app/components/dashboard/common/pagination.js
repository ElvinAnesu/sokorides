"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Pagination({ totalPages }) {
    const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber) => { 
        console.log("executed")
		const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        console.log(`${pathname}?${params.toString()}`);
		return `${pathname}?${params.toString()}`;
	};

	return (
		<div className="inline-flex gap-4 flex items-center">
			<button
				className="flex h-10 w-10 items-center justify-center rounded-md border"
				onClick={() => router.push(createPageURL(currentPage - 1))}
				disabled={currentPage <= 1}
			>
				<ArrowLeftIcon className="w-4" />
			</button>
			<span>page: {currentPage}</span>
			<button
				className="flex h-10 w-10 items-center justify-center rounded-md border"
				onClick={() => router.push(createPageURL(currentPage + 1))}
				disabled={currentPage >= totalPages}
			>
				<ArrowRightIcon className="w-4" />
			</button>
		</div>
	);
}
