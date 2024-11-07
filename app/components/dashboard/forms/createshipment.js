"use client";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import {
	CurrencyDollarIcon,
	UserCircleIcon,
    DocumentTextIcon,
    MapIcon,
    MapPinIcon
} from "@heroicons/react/24/outline";
import { createShipment } from "@/lib/actions";

export default function CreateShipmentForm({ customers }) { 

	const [customername, setCustomerName] = useState();
	const [customerphone, setCustomerphone] = useState();
	const [purchaseditem, setPurchasedItem] = useState();
	const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [price, setPrice] = useState()
	

	const addShipment = async (e) => {
		e.preventDefault();
		await createShipment(
			customername,
			customerphone,
			purchaseditem,
			origin,
			destination,
			price
		);
	};

	const setSelectedCustomer = async (index) => {
		const customer = customers[index];
		setCustomerName(`${customer.surname} ${customer.firstname}`);
		setCustomerphone(customer.phonenumber);
	};

	return (
		<div className="w-full flex flex-col">
			<div className="flex w-full bg-white rounded-lg p-2">
				<form
					className="flex flex-col w-full gap-4 bg-gray-200 rounded p-4"
					onSubmit={(e) => addShipment(e)}
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
						<h1 className="text-xs font-semibold">Price</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="amount"
								type="number"
								onChange={(e) => setPrice(e.target.value)}
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Origin</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="origin"
								onChange={(e) => setOrigin(e.target.value)}
							/>
							<MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Destination</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="destination"
								onChange={(e) => setDestination(e.target.value)}
							/>
							<MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<button className="bg-purple-900 rounded p-2 text-white max-w-32">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
