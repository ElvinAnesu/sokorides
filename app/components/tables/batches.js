"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EyeOpenIcon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";

export default function BatchesTable() {
	const router = useRouter();
	const [shipments, setShipments] = useState([]);
	const [isLoadiig, setIsLoading] = useState(false);

	const getShipments = async () => {
		setIsLoading(true);
		const response = await fetch("/api/shipments", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (data.success) {
			setShipments(data.shipments);
			setIsLoading(false);
		} else {
			alert(data.message);
			setIsLoading(false);
		}
	};
	const deleteShipment = async (_id) => {
		const response = await fetch(`/api/shipments/${_id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (data.success) {
			alert(data.message);
		} else {
			alert(data.message);
		}
	};
	useEffect(() => {
		getShipments();
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
						{shipments.map((shipment, index) => (
							<tr className="border-b border-gray-500" key={index}>
								<td className="px-2 rounded-s-full text-sm">{index + 1}</td>
								<td className="px-2 rounded-s-full text-sm">
									Batch name
								</td>
								<td className="text-sm hidden md:table-cell">
									3
								</td>
								<td className="text-sm hidden md:table-cell">
									Now in Chirundu
								</td>
								<td className="px-2 rounded-e-full flex items-center justify-around">
									<button
										onClick={() =>
											router.push(`/dashboard/shipments/${shipment._id}`)
										}
									>
										<EyeOpenIcon />
									</button>
									<button onClick={() => deleteShipment(shipment._id)}>
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
