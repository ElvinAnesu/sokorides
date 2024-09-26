"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";

export default function CreateNew() {
	const router = useRouter();
	const [purchasedItem, setPurchasedItem] = useState();
	const [totalPrice, setTotalPrice] = useState();
	const [currentPayment, setCurrentPayment] = useState();
	const [vehilceStatus, setVehicleStatus] = useState();
	const [isLoadiig, setIsLoading] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [selectCustomer, setSelectedCustomer] = useState();
	const [gallery, setGallery] = useState([]);
	
	const uploadSuccess = (results, options) => {
		setGallery((gallery) => [...gallery, results.info.url]);
	};
	const createPurchases = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch("/api/purchases", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				customerName: `${customers[selectCustomer].firstname} ${customers[selectCustomer].surname}`,
				customerId: customers[selectCustomer]._id,
				purchasedItem: purchasedItem,
				vehicleStatus: vehilceStatus,
				totalPrice: totalPrice,
				currentPayment: currentPayment,
				gallery:gallery
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
	const getCustomers = async () => {
		const response = await fetch("/api/customers", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (data.success) {
			console.log(data.customers);
			setCustomers(data.customers);
		} else {
			alert(data.message);
		}
	};

	useEffect(() => {
		getCustomers();
	}, []);

	return (
		<div className="h-full w-full flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<button
					className="border border-purple-900 rounded-full p-1 text-purple-900"
					onClick={() => router.back()}
				>
					<ArrowLeftIcon className="h-4 w-4" />
				</button>
				<h1 className="text-gray-900 text-sm font-semibold">
					Create New Purchase
				</h1>
			</div>
			{isLoadiig ? (
				<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
					<div className="flex flex-col items-center justify-center  w-full h-full">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
					</div>
				</div>
			) : (
				<form
					className="flex flex-col md:grid md:grid-cols-3 gap-4"
					onSubmit={(e) => createPurchases(e)}
				>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Customer</h1>
						<select
							className="bg-transparent rounded p-2 border border-black"
							onChange={(e) => setSelectedCustomer(e.target.value)}
							required
						>
							<option>-Select Customer-</option>
							{customers.map((customer, index) => (
								<option
									key={index}
									className="bg-gray-300 text-gray-900"
									value={index}
								>{`${customer.firstname} ${customer.surname}`}</option>
							))}
						</select>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Purchased Vehicle</h1>
						<input
							className="bg-transparent rounded p-2 border border-black text-sm"
							placeholder="purchased vehilce"
							onChange={(e) => setPurchasedItem(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Total Price</h1>
						<input
							className="bg-transparent rounded p-2 border border-black text-sm"
							placeholder="purchased vehilce"
							onChange={(e) => setTotalPrice(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Current Payment</h1>
						<input
							className="bg-transparent rounded p-2 border border-black text-sm"
							placeholder="purchased vehilce"
							onChange={(e) => setCurrentPayment(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Vehicle Status</h1>
						<select
							className="bg-transparent rounded p-2 border border-black"
							onChange={(e) => setVehicleStatus(e.target.value)}
							required
						>
							<option value={"in-stock"}>In stock</option>
							<option value={"in-transit"}>In Transit</option>
							<option value={"delivered"}>Delivered</option>
						</select>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-bold">Upload Images</h1>
						<CldUploadButton
							className="border border-black text-black rounded rounded p-1"
							uploadPreset="sokoimgs"
							onSuccess={(results, options) => uploadSuccess(results, options)}
						/>
					</div>
					<button
						className="bg-purple-900 rounded text-white p-2"
						type="submit"
					>
						Create
					</button>
				</form>
			)}
		</div>
	);
}
