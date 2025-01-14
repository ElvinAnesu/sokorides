"use client";
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import { updateDownPayment } from "@/lib/server-actions/lease";
import { use, useState } from "react";
import {
	UserCircleIcon,
	CurrencyDollarIcon,
	CalendarDaysIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";


export default function LeasedCarDetails({ params }) { 

	const { _id } = use(params);
	const [isLoading, setIsLoading] = useState(false) 
	const [fullname, setFullname] = useState();
	const [date, setDate] = useState();
	const [amount, setAmount] = useState();
	const [description, setDescription] = useState();
	const [paymentMethod, setPaymentMethod] = useState();


	const _updatePayments = async (e) => { 
		e.preventDefault()
        setIsLoading(true)
        await updateDownPayment(
					_id,
					amount,
					fullname,
					date,
					amount,
					description,
					paymentMethod
				);
        setIsLoading(false)
    }

	

	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Update Payments"} />
			<div className="w-full flex flex-col">
				<div className="flex w-full bg-white rounded-lg p-2">
					<form
						className="flex flex-col w-full gap-4 bg-gray-200 rounded p-4"
						onSubmit={(e) => _updatePayments(e)}
					>
						<div>
							<h1 className="text-xs font-semibold">Full Name</h1>
							<div className="relative">
								<input
									className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
									placeholder="description"
									onChange={(e) => setFullname(e.target.value)}
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
							<h1 className="text-xs font-semibold">Payment Method</h1>
							<div className="relative">
								<input
									className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
									placeholder="amount"
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
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
		</div>
	);
}
