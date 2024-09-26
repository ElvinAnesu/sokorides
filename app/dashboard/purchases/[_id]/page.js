"use client";
import { ArrowLeftIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CldUploadButton, CldImage } from "next-cloudinary";

export default function PurchaseDetails({ params }) {
	const router = useRouter();
	const { _id } = params;
	const [customer, setCustomer] = useState();
	const [purchasedItem, setPurchasedItem] = useState();
	const [customerId, setCustomerId] = useState();
	const [vehicleStatus, setVehicleStatus] = useState();
	const [totalPrice, setTotalPrice] = useState();
	const [currentPayment, setCurrentPayment] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [edit, setEdit] = useState(false);
	const [gallery, setGallery] = useState([]);


	const uploadSuccess = (results, options) => {
		setGallery((gallery) => [...gallery, results.info.url]);
	};
	const getPurchasesDetails = async () => {
		setIsLoading(true);
		const response = await fetch(`/api/purchases/${_id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (data.success) {
			setCustomer(data.purchase.customerName);
			setPurchasedItem(data.purchase.purchasedItem);
			setCustomerId(data.purchase.customerId);
			setVehicleStatus(data.purchase.vehicleStatus);
			setTotalPrice(data.purchase.totalPrice);
			setCurrentPayment(data.purchase.currentPayment);
			setGallery(data.purchase.gallery);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			alert(data.message);
		}
	};
	const updatePurchaseDetails = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch(`/api/purchases/${_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				customerName: customer,
				customerId: customerId,
				purchasedItem: purchasedItem,
				vehicleStatus: vehicleStatus,
				totalPrice: totalPrice,
				currentPayment: currentPayment,
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
		getPurchasesDetails();
	}, []);
	return (
		<div className="w-full h-full flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<button
					className="border border-purple-900 rounded-full p-1 text-purple-900"
					onClick={() => router.back()}
				>
					<ArrowLeftIcon className="h-4 w-4" />
				</button>
				<h1 className="text-sm font-semibold">Purchases Details</h1>
			</div>
			<div className="flex w-full items-center justify-end">
				<button
					className="rounded bg-purple-900 text-white text-sm px-4 py-2 flex items-center gap-1"
					onClick={() => setEdit(!edit)}
				>
					{edit ? (
						"Cancel"
					) : (
						<span className="flex items-center gap-2">
							<Pencil1Icon /> Edit
						</span>
					)}
				</button>
			</div>
			{isLoading ? (
				<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
					<div className="flex flex-col items-center justify-center  w-full h-full">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
					</div>
				</div>
			) : (
				<form
					className="flex flex-col md:grid md:grid-cols-3 gap-4"
					onSubmit={(e) => updatePurchaseDetails(e)}
				>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Customer</h1>
						<input
							className="p-2 text-sm rounded border border-gray-900 bg-transparent"
							placeholder="Customer name"
							value={customer}
							onChange={(e) => setCustomer(e.target.value)}
							disabled={!edit}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Purchased Vehicle</h1>
						<input
							className="p-2 text-sm rounded border border-gray-900 bg-transparent"
							placeholder="Purchased Vehicle"
							value={purchasedItem}
							onChange={(e) => setPurchasedItem(e.target.value)}
							disabled={!edit}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Vehicle Status</h1>
						{edit ? (
							<select
								className="bg-transparent rounded p-2 border border-black"
								onChange={(e) => setVehicleStatus(e.target.value)}
								required
							>
								<option value={"in-stock"}>In stock</option>
								<option value={"in-transit"}>In Transit</option>
								<option value={"delivered"}>Delivered</option>
							</select>
						) : (
							<input
								className="p-2 text-sm rounded border border-black bg-transparent"
								placeholder="Vehicle Status"
								value={vehicleStatus}
								onChange={(e) => setVehicleStatus(e.target.value)}
								disabled={!edit}
							/>
						)}
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Total Price</h1>
						<input
							className="p-2 text-sm rounded border border-black bg-transparent"
							placeholder="Total Payments"
							value={totalPrice}
							onChange={(e) => setTotalPrice(e.target.value)}
							disabled={!edit}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Current Payment</h1>
						<input
							className="p-2 text-sm rounded border border-black bg-transparent"
							placeholder="Current Payment"
							value={currentPayment}
							onChange={(e) => setCurrentPayment(e.target.value)}
							disabled={!edit}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Outstanding Payment</h1>
						<input
							className="p-2 text-sm rounded border border-black bg-transparent"
							placeholder="Outstanding Payment"
							value={totalPrice - currentPayment}
							disabled
						/>
					</div>
					{edit && (
						<div className="flex flex-col">
							<h1 className="text-xs font-semibold">Upload Image</h1>
							<CldUploadButton
								className="border border-black text-black rounded rounded p-1"
								uploadPreset="sokoimgs"
								onSuccess={(results, options) =>
									uploadSuccess(results, options)
								}
							/>
						</div>
					)}
					<div className="md:col-span-3 grid grid-cols-3 md:grid-cols-8 gap-2">
						{gallery.map((image, index) => (
							<button
								className="border border-purple-900 rounded flex flex-col items-center justify-center min-h-24 min-w-24"
								key={index}
								onClick={() => setDisplayimage(image)}
							>
								<CldImage
									width="100"
									height="100"
									src={gallery[index]}
									sizes="100vw"
									alt="car description"
								/>
							</button>
						))}
					</div>
					{edit && (
						<button className="bg-purple-900 p-2 rounded text-white">
							Update
						</button>
					)}
				</form>
			)}
		</div>
	);
}
