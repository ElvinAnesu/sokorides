"use client";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function CreateNew() {
	const router = useRouter();
	const [allshipments, setAllShipments] = useState([]);
	const [shipments, setShipments] = useState([]);
	const [batchName, setBatchName] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const getShipments = async () => {
		const response = await fetch("/api/shipments", {
			method: "GET",
			headers: { "Content-Type": "applicaton/json" },
		});
		const data = await response.json();
		if (data.success) {
			setAllShipments(data.shipments);
		} else {
			alert(data.message);
		}
	};
	const addShipment = (selectedshipment) => {
		if (!shipments.includes(selectedshipment)) {
			setShipments((shipments) => [...shipments, selectedshipment]);
		}
	};
	const removeShipment = (shipmentToRemove) => {
		setShipments((shipments) =>
			shipments.filter((item) => item !== shipmentToRemove)
		);
	};
	const createBatch = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch("/api/batch", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				batchName,
				shipments,
				updates: [],
			}),
		});
		const data = await response.json();
		if (data.success) {
			setIsLoading(false);
			alert(data.message);
		} else {
			setIsLoading(false);
			alert(data.message);
		}
	};

	useEffect(() => {
		getShipments();
	}, []);

	return (
		<div className="w-full h-full flex flex-col gap-4 p-4">
			<div className="flex items-center gap-2">
				<button
					className="rounded-full border border-purple-900 text-purple-900 p-1"
					onClick={() => router.back()}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</button>
				<h1 className="text-sm font-semibold">Create New Batch Shipment</h1>
			</div>
			<div className="w-full flex flex-col md:grid md:grid-cols-5 items-center gap-2">
				{allshipments
					.filter((_shipment) => shipments.includes(_shipment._id))
					.map((shipment_, index) => (
						<div
							className="flex p-2 gap-2 bg-purple-900 shadow rounded text-white font-semibold items-center justify-between"
							key={index}
						>
							<h1 className="text-xs">
								{`${shipment_.customername}-${shipment_.purchaseditem}`}
							</h1>
							<button onClick={() => removeShipment(shipment_._id)}>
								<Cross1Icon />
							</button>
						</div>
					))}
			</div>
			{isLoading ? (
				<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
					<div className="flex flex-col items-center justify-center  w-full h-full">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
					</div>
				</div>
			) : (
				<form
					className="flex flex-col md:grid md:grid-cols-3 p-4 bg-white rounded"
					onSubmit={(e) => createBatch(e)}
				>
					<div className="flex flex-col p-2">
						<h1 className="text-xs font-bold">Add Shipments</h1>
						<select
							className="p-2 border border-gray-900 rounded bg-transparent"
							onChange={(e) => addShipment(e.target.value)}
						>
							<option className="bg-gray-900 text-white">
								--select shipment--
							</option>
							{shipments ? (
								allshipments.map((shipment, index) => (
									<option
										key={index}
										className="bg-gray-900 text-white"
										value={shipment._id}
									>{`${shipment.customername}-${shipment.purchaseditem}`}</option>
								))
							) : (
								<option className="bg-gray-900 text-white">
									no shipments found
								</option>
							)}
						</select>
					</div>
					<div className="flex flex-col p-2">
						<h1 className="text-xs font-bold">Batch Name</h1>
						<input
							className="border border-black rounded bg-transparent w-full p-2 test-sm"
							placeholder="purchased vehicle"
							onChange={(e) => setBatchName(e.target.value)}
						/>
					</div>
					<div></div>
					<div className="flex flex-col p-2">
						<button className="w-full bg-purple-900 text-white rounded p-2">
							Create
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
