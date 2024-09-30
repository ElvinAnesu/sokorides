"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";

export default function ShipmentDetails({ params }) {
	const router = useRouter();
	const { _id } = params;
	const [batchName, setBatchName] = useState();
	const [update, setUpdate] = useState(false);
	const [shipments, setShipments] = useState([]);
	const [batchupdate, setBatchupdate] = useState();
	const [showupdateinput, setShowupdateinput] = useState(false);
	const [updates, setUpdates] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [allshipments, setAllShipments] = useState([]);

	const getBatch = async () => {
		setIsLoading(true);
		const response = await fetch(`/api/batch/${_id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();

		if (data.success) {
			setBatchName(data.batch.batchName);
			setUpdates(data.batch.updates);
			setShipments(data.batch.shipments);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			alert(data.message);
		}
	};

	const sendBatchUpdate = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch("/api/batch/tracker", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				_id,
				update: batchupdate,
			}),
		});
		const data = await response.json();
		if (data.success) {
			setIsLoading(false);
			alert(data.message);
			window.location.reload();
		} else {
			setIsLoading(false);
			alert(data.message);
		}
	};

	const updateBatch = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch(`/api/batch/${_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				batchName,
				shipments,
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
	const getShipments = async (e) => {
		const response = await fetch(`/api/shipments`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();

		if (data.success) {
			setAllShipments(data.shipments);
		} else {
			alert(data.message);
		}
	};
	const addShipment = async (e) => {
		const selectedshipment = allshipments[e]._id;
		if (selectedshipment) {
			if (!shipments.includes(selectedshipment)) {
				setShipments((shipments) => [...shipments, selectedshipment]);
			}
        }
        console.log(shipments);
	};
    const removeShipment = (shipmentToRemove) => {
			setShipments((shipments) =>
				shipments.filter((item) => item !== shipmentToRemove)
			);
		};
	useEffect(() => {
		getBatch();
		getShipments();
	}, []);

	return (
		<div className="w-full h-full flex flex-col  p-4 gap-4 rounded">
			<div className="flex items-center gap-2">
				<button
					className="border border-purple-900 text-purple-900 rounded-full p-1"
					onClick={(e) => router.back()}
				>
					<ArrowLeftIcon className="h-5 w-5" />
				</button>
				<h1 className="text-sm font-bold">Batch Shipment Details</h1>
			</div>
			<div className="w-full flex flex-col md:grid md:grid-cols-5 items-center gap-2">
				{allshipments
					.filter((_shipment) => shipments.includes(_shipment._id))
					.map((shipment_, index) => (
						<div className="flex p-2 gap-2 bg-purple-900 shadow rounded text-white font-semibold items-center justify-between" key={index}>
							<h1 className="text-xs">
								{`${shipment_.customername}-${shipment_.purchaseditem}`}
							</h1>
							<button onClick={()=>removeShipment(shipment_._id)}>
								<Cross1Icon />
							</button>
						</div>
					))}
			</div>
			<div className="w-full flex flex-col md:grid md:grid-cols-5 items-center gap-2">
				<form
					className="flex grid grid-cols-2 md:grid-cols-4 gap-2 items-center w-full md:col-span-4"
					onSubmit={(e) => updateBatch(e)}
				>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Batch Name</h1>
						<input
							className="p-2 border border-gray-900 rounded bg-transparent"
							placeholder="Customer name"
							value={batchName}
							onChange={(e) => setBatchName(e.target.value)}
							disabled={!update}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Number of shipments</h1>
						<input
							className="p-2 border border-gray-900 rounded bg-transparent"
							placeholder="Purchased Vehicle"
							value={shipments.length || 0}
							disabled
						/>
					</div>
					{update && (
						<div className="flex flex-col">
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
											value={index}
										>{`${shipment.customername}-${shipment.purchaseditem}`}</option>
									))
								) : (
									<option className="bg-gray-900 text-white">
										no shipments found
									</option>
								)}
							</select>
						</div>
					)}
					{update && (
						<div className="flex flex-col w-full">
							<button className="bg-purple-900 text-white px-4 py-2 rounded w-full">
								Update
							</button>
						</div>
					)}
				</form>

				<div className="flex flex-col w-full text-white">
					<button
						className="rounded px-4 py-2 bg-purple-900 rounded w-full"
						onClick={(e) => setUpdate(!update)}
					>
						{update ? "Close" : "Edit"}
					</button>
				</div>
			</div>
			{isLoading ? (
				<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
					<div className="flex flex-col items-center justify-center  w-full h-full">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
					</div>
				</div>
			) : (
				<div className="w-full h-full flex flex-col bg-gray-200 rounded p-2 gap-2">
					<h1 className="text-sm font-semibold">STATUS</h1>
					<table className="w-full">
						<tbody>
							{updates.map((update_, index) => (
								<tr key={index}>
									<td className="text-xs bg-gray-100 border-b p-1">
										update {index + 1}: {update_}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="w-full flex flex-col gap-2">
						<div className="flex w-full items-center justify-end">
							<button
								className="bg-purple-900 text-white p-2 rounded text-xs"
								onClick={() => setShowupdateinput(!showupdateinput)}
							>
								{showupdateinput ? "close" : "post update"}
							</button>
						</div>
						{showupdateinput && (
							<div className="flex flex-col md:flex-row gap-2">
								<form
									className="flex flex-col gap-2"
									onSubmit={(e) => sendBatchUpdate(e)}
								>
									<h1 className="text-xs font-bold">Customer name</h1>
									<textarea
										className="p-2 border border-black rounded bg-transparent md:min-w-96"
										placeholder="Post update"
										onChange={(e) => setBatchupdate(e.target.value)}
										required
									/>
									<button
										className="bg-purple-900 text-white p-2 rounded text-xs"
										type="submit"
									>
										submit
									</button>
								</form>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
