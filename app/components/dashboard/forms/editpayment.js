"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	UserCircleIcon,
	CurrencyDollarIcon,
	CalendarDaysIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { updatePayment } from "@/lib/actions";
import { extractDate } from "@/lib/utils";

export default function EditPaymentForm({ payment }) { 
    
    const _id = payment._id;
	const [fullname, setFullname] = useState();
	const [date, setDate] = useState();
	const [amount, setAmount] = useState();
	const [description, setDescription] = useState();
	const [paymentMethod, setPaymentMethod] = useState();
	const [loading, setLoading] = useState(false);


	const editPayment = async (e) => {
		e.preventDefault();
		setLoading(true)
		await updatePayment(_id,fullname, date, amount, description, paymentMethod);
	};

	return (
		<div className="relative w-full flex flex-col">
			{loading && (
				<div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
					<div className="w-8 h-8 border-4 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
				</div>
			)}
			<div className="flex w-full bg-white rounded-lg p-2">
				<form
					className="flex flex-col w-full gap-4 bg-gray-200 rounded p-4"
					onSubmit={(e) => editPayment(e)}
				>
					<div>
						<h1 className="text-xs font-semibold">Full Name</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="description"
								onChange={(e) => setFullname(e.target.value)}
								defaultValue={payment.fullname}
							/>
							<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Payment Description</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="description"
								onChange={(e) => setDescription(e.target.value)}
								defaultValue={payment.description}
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
								defaultValue={payment.amount}
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Payment Method</h1>
						<div className="relative">
							<select
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								onChange={(e) => setPaymentMethod(e.target.value)}
								defaultValue={payment?.paymentMethod}
							>
								<option value="" disabled>Select payment method</option>
								<option value="Cash">Cash</option>
								<option value="Ecocash">Ecocash</option>
								<option value="Transfer">Transfer</option>
								<option value="PayPal">PayPal</option>
							</select>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Date</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="amount"
								type="date"
								onChange={(e) => setDate(e.target.value)}
								defaultValue={extractDate(payment.date)}
							/>
							<CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
