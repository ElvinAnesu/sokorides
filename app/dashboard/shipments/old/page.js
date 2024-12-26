"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function ShipmentDetails(props) {
    const params = use(props.params);
    const router = useRouter();
    const { _id } = params;
    const [shipment, setShipment] = useState({});
    const [customername, setCustomername] = useState();
    const [purchaseditem, setPurchaseditem] = useState();
    const [price, setPrice] = useState();
    const [update, setUpdate] = useState(false);
    const [shipmentupdate, setShipmentupdate] = useState();
    const [showupdateinput, setShowupdateinput] = useState(false);
    const [updates, setUpdates] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    //update shipment variables
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [customerphone, setCustomerphone] = useState();
    const [customeremail, setCustomeremail] = useState();

    const getShipmet = async () => {
		setIsloading(true);
		const response = await fetch(`/api/shipments/${_id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();

		if (data.success) {
			setShipment(data.shipment);
			setCustomername(data.shipment.customername);
			setPurchaseditem(data.shipment.purchaseditem);
			setPrice(data.shipment.price);
			setOrigin(data.shipment.origin);
			setDestination(data.shipment.destination);
			setCustomerphone(data.shipment.phone);
			setCustomeremail(data.shipment.email);
			setUpdates(data.shipment.update);
			setIsloading(false);
		} else {
			setIsloading(false);
			alert(data.message);
		}
	};

    const sendShipmentupdate = async (e) => {
		e.preventDefault();
		const response = await fetch("/api/shipments/tracker", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				_id,
				update: shipmentupdate,
			}),
		});
		const data = await response.json();
		if (data.success) {
			alert(data.message);
		} else {
			alert(data.message);
		}
	};

    const updateShipment = async (e) => {
		e.preventDefault();
		setIsloading(true);
		const response = await fetch(`/api/shipments/${_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				customername,
				customerphone,
				customeremail,
				purchaseditem,
				origin,
				destination,
				update: updates,
				price,
			}),
		});
		const data = await response.json();
		if (data.success) {
			setIsloading(false);
			alert(data.message);
		} else {
			setIsloading(false);
			alert(data.message);
		}
	};

    useEffect(() => {
		getShipmet();
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
				<h1 className="text-sm font-bold">Shipment Details</h1>
			</div>
			<div className="w-full flex flex-col md:grid md:grid-cols-5 items-center gap-2">
				<form
					className="flex grid grid-cols-2 md:grid-cols-4 gap-2 items-center w-full md:col-span-4"
					onSubmit={(e) => updateShipment(e)}
				>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Customer name</h1>
						<input
							className="p-2 border border-gray-900 rounded bg-transparent"
							placeholder="Customer name"
							value={customername}
							onChange={(e) => setCustomername(e.target.value)}
							disabled
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Purchased Vehicle</h1>
						<input
							className="p-2 border border-gray-900 rounded bg-transparent"
							placeholder="Purchased Vehicle"
							value={purchaseditem}
							onChange={(e) => setPurchaseditem(e.target.value)}
							disabled={!update}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Price</h1>
						<input
							className="p-2 border border-gray-900 rounded bg-transparent"
							placeholder="Price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							disabled={!update}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Price</h1>
						<input
							className="p-2 border border-gray-900 rounded bg-transparent"
							placeholder="Origin"
							value={origin}
							onChange={(e) => setOrigin(e.target.value)}
							disabled={!update}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Destination</h1>
						<input
							className="p-2 border border-gray-900 rounded bg-transparent"
							placeholder="Origin"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							disabled={!update}
						/>
					</div>
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
									onSubmit={(e) => sendShipmentupdate(e)}
								>
									<h1 className="text-xs font-bold">Customer name</h1>
									<textarea
										className="p-2 border border-black rounded bg-transparent md:min-w-96"
										placeholder="Post update"
										onChange={(e) => setShipmentupdate(e.target.value)}
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
