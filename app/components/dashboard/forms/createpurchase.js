"use client";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import {
	CheckIcon,
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { createPurchase } from "@/lib/actions";

export default function CreatePurchaseForm({ customers }) { 

	const [customerName, setCustomerName] = useState();
	const [customerId, setCustomerId] = useState();
	const [purchasedItem, setPurchasedItem] = useState();
	const [vehicleStatus, setVehicleStatus] = useState(false);
	const [totalPrice, setTotalPrice] = useState();
    const [currentPayment, setCurrentPayment] = useState(); 
    const [customerPhonenumber, setCustomerPhonenumber] = useState()
    const [gallery, setGallery] = useState([])


	const uploadSuccess = (results, options) => {
		setGallery((gallery) => [...gallery, results.info.url]);
    };
    
	const addPurchase = async (e) => {
		e.preventDefault();
		await createPurchase(
			customerName,
			customerId,
			purchasedItem,
			vehicleStatus,
			totalPrice,
			currentPayment,
			customerPhonenumber,
			gallery
		);
	};

	const setSelectedCustomer = async (index) => {
		const customer = customers[index];
		setCustomerName(`${customer.surname} ${customer.firstname}`);
        setCustomerId(customer._id);
        setCustomerPhonenumber(customer.phonenumber)
	};

	return (
		<div className="w-full flex flex-col">
			<div className="flex w-full bg-white rounded-lg p-2">
				<form
					className="flex flex-col w-full gap-4 bg-gray-200 rounded p-4"
					onSubmit={(e) => addPurchase(e)}
				>
					<div>
						<h1 className="text-xs font-semibold">Select Customer</h1>
						<div className="relative">
							<select
								className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								onChange={(e) => setSelectedCustomer(e.target.value)}
							>
								<option value="">Select Customer</option>
								{customers.map((customer, index) => (
									<option
										value={index}
										className="text-black text-xs"
										key={index}
									>
										{`${customer.firstname}  ${customer.surname}`}
									</option>
								))}
							</select>
							<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Purchased Vehicle</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="description"
								onChange={(e) => setPurchasedItem(e.target.value)}
							/>
							<DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Total Price</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="amount"
								type="number"
								onChange={(e) => setTotalPrice(e.target.value)}
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Current Payment</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="amount"
								type="number"
								onChange={(e) => setCurrentPayment(e.target.value)}
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Select Status</h1>
						<div className="relative">
							<select
								className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								onChange={(e) => setVehicleStatus(e.target.value)}
							>
								<option value="">Select Purchase</option>
								<option value="in-transit">In Transit</option>
								<option value="in-stock">In Stock</option>
								<option value="delivered">Delivered</option>
							</select>
							<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<h1 className="text-xs font-semibold">upload images</h1>
						<CldUploadButton
							className="border border-black text-black rounded text-purple-900 rounded p-1 max-w-32 shadow"
							uploadPreset="sokoimgs"
							onSuccess={(results, options) => uploadSuccess(results, options)}
						/>
					</div>
					<button className="bg-purple-900 rounded p-2 text-white max-w-32">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
