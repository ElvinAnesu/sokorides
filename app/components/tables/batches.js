"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	EyeOpenIcon,
	TrashIcon,
	PlusIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
} from "@radix-ui/react-icons";

const PAGE_SIZE = 10;

export default function BatchesTable() {
	const router = useRouter();
	const [batches, setBatches] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	const getBatches = async () => {
		setIsLoading(true);
		const response = await fetch(
			`/api/batch?page=${page}&pageSize=${PAGE_SIZE}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);
		const data = await response.json();
		if (data.success) {
			setBatches(data.batches);
			setTotal(data.totalBatches);
			setIsLoading(false);
		} else {
			alert(data.message);
			setIsLoading(false);
		}
	};

	const deleteBatch = async (_id) => {
		const role = localStorage.getItem("role")
		if (role === "owner") {
			const confirmDelete = confirm("Delete this batch")
			if (confirmDelete) {
				setIsLoading(true)
				const response = await fetch(`/api/batch/${_id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				});
				const data = await response.json();
				if (data.success) {
					setIsLoading(false)
					alert(data.message);
					window.location.reload();
				} else {
					setIsLoading(false);
					alert(data.message);
				}
			}
		} else {
			alert("No rights to perfom this action")
		}
	};

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const handleNextPage = () => {
		if (page * PAGE_SIZE < total) {
			setPage(page + 1);
		}
	};

	useEffect(() => {
		getBatches();
	}, [page]);

	return (
		<div className="flex flex-col w-full h-full gap-2">
			<div className="flex w-full items-center justify-end">
				<button
					className="border bg-purple-900 text-white text-sm rounded p-2 flex items-center gap-1"
					onClick={() => router.push("/dashboard/batches/createnew")}
				>
					<PlusIcon />
					Add New
				</button>
			</div>
			<div className="w-full bg-gray-200 rounded p-4">
				{isLoading ? (
					<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
						<div className="flex flex-col items-center justify-center  w-full h-full">
							<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
						</div>
					</div>
				) : (
					<table className="w-full">
						<tbody>
							<tr className="px-2 bg-purple-900 text-white rounded-full">
								<td className="px-2 rounded-s-full text-sm font-semibold">#</td>
								<td className="px-2 text-sm font-semibold">Batch</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Number of Shipments
								</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Last Update
								</td>
								<td className="px-2 rounded-e-full text-sm font-semibold">
									Action
								</td>
							</tr>
							{batches.map((batch, index) => (
								<tr className="border-b border-gray-500" key={index}>
									<td className="px-2 rounded-s-full text-sm">{index + 1}</td>
									<td className="px-2 rounded-s-full text-sm">
										{batch.batchName}
									</td>
									<td className="text-sm hidden md:table-cell">
										{batch.shipments.length || 0}
									</td>
									<td className="text-sm hidden md:table-cell">
										{batch.updates.at(-1) || "no updates yet"}
									</td>
									<td className="px-2 rounded-e-full flex items-center gap-4">
										<button
											onClick={() =>
												router.push(`/dashboard/batches/${batch._id}`)
											}
										>
											<EyeOpenIcon />
										</button>
										<button onClick={() => deleteBatch(batch._id)}>
											<TrashIcon />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				<div className="flex w-full items-full items-center justify-center gap-4 mt-4">
					<button
						className="border border-purple-900 rounded-full p-1 text-purple-900"
						onClick={handlePreviousPage}
						disabled={page === 1}
					>
						<ArrowLeftIcon />
					</button>
					<span className="text-sm">page{page}</span>
					<button
						className="border border-purple-900 rounded-full p-1 text-purple-900"
						onClick={handleNextPage}
						disabled={page * PAGE_SIZE >= total}
					>
						<ArrowRightIcon />
					</button>
				</div>
			</div>
		</div>
	);
}
