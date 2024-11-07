"use client";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import {
	CheckIcon,
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { createIinvoice } from "@/lib/actions";

export default function CreateInvoiceForm({ customers }) {

    const [customername, setCustomername] = useState();
    const [customerId, setCustomerId] = useState()
    const [amount, setAmount] = useState()
    const [isPaid,setIsPaid] = useState(false)
	const [description, setDescription] = useState();
	const [invoiceUrl, setInvoiceUrl] = useState();

	const uploadSuccess = (results, options) => {
		setInvoiceUrl(results.info.url);
	};


	const addInvoice = async (e) => {
		e.preventDefault();
        await createIinvoice(
					customername,
					customerId,
					amount,
					isPaid,
					description,
					invoiceUrl
        		); 
        
	};

    const setSelectedCustomer = async (index) => {
        const customer = customers[index]
        setCustomername(`${customer.surname} ${customer.firstname}`);
        setCustomerId(customer._id)
    } 

	return (
		<div className="w-full flex flex-col">
			<div className="flex w-full bg-white rounded-lg p-2">
				<form
					className="flex flex-col w-full gap-4 bg-gray-200 rounded p-4"
					onSubmit={(e) => addInvoice(e)}
				>
					<div>
						<h1 className="text-xs font-semibold">Select Customer</h1>
						<div className="relative">
							<select
								className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								onChange={(e) => setSelectedCustomer(e.target.value)}
							>
								<option value="">Select Purchase</option>
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
						<h1 className="text-xs font-semibold">Invoice Description</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="description"
								onChange={(e) => setDescription(e.target.value)}
							/>
							<DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Amount</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="amount"
								type="number"
								onChange={(e) => setAmount(e.target.value)}
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Invoice Status</h1>
						<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
							<div className="flex gap-4">
								<div className="flex items-center">
									<input
										id="pending"
										name="status"
										type="radio"
										required
										value="pending"
										className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										onChange={() => setIsPaid(false)}
									/>
									<label
										htmlFor="pending"
										className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
									>
										Pending <ClockIcon className="h-4 w-4" />
									</label>
								</div>
								<div className="flex items-center">
									<input
										id="paid"
										name="status"
										required
										type="radio"
										value="paid"
										className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
										onChange={() => setIsPaid(true)}
									/>
									<label
										htmlFor="paid"
										className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
									>
										Paid <CheckIcon className="h-4 w-4" />
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<h1 className="text-xs font-semibold">upload invoice(pdf)</h1>
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
