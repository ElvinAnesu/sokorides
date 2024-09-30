"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EyeOpenIcon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";

export default function BatchesTable() {
	const router = useRouter();
	const [batches, setBatches] = useState([]);
	const [isLoadiig, setIsLoading] = useState(false);

	const getBatches = async () => {
		setIsLoading(true);
		const response = await fetch("/api/batch", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (data.success) {
			setBatches(data.batches);
			setIsLoading(false);
		} else {
			alert(data.message);
			setIsLoading(false);
		}
	};
	const deleteBatch = async (_id) => {
		const response = await fetch(`/api/batch/${_id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (data.success) {
			alert(data.message);
			window.location.reload();
		} else {
			alert(data.message);
		}
	};
	useEffect(() => {
		getBatches();
	}, []);

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
			<div className="w-full h-full bg-gray-200 rounded p-4">
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
								<td className="px-2 rounded-e-full flex items-center justify-around">
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
			</div>
		</div>
	);
}
