"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNew() {
	const router = useRouter();
	const [fullname, setFullname] = useState();
	const [amount, setAmount] = useState();
	const [date, setDate] = useState();
	const [description, setDescription] = useState();
	const [paymentMethod, setPaymentMethod] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const recordPayment = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch("/api/payments", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				fullname,
				amount,
				paymentMethod,
				date,
				description,
			}),
		});
		const data = await response.json();
		if (data.success) {
			alert(data.message);
			setIsLoading(false);
		} else {
			alert(data.message);
			setIsLoading(false);
		}
	};
	return (
		<div className="flex flex-col w-full h-full gap-4">
			<div className="flex   w-full items-center gap-2">
				<button
					className="border border-purple-900 text-purple-900 rounded-full flex items-center justify-centr p-1"
					onClick={() => router.back()}
				>
					<ArrowLeftIcon className="h-4 w-4" />
				</button>
				<h1 className="text-sm font-bold">Add New Payment</h1>
			</div>

			{isLoading ? (
				<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
					<div className="flex flex-col items-center justify-center  w-full h-full">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
					</div>
				</div>
			) : (
				<form
					className="flex flex-col md:grid md:grid-cols-3 gap-4"
					onSubmit={(e) => recordPayment(e)}
				>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Full Name</h1>
						<input
							className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
								placeholder="full name"
								onChange={(e)=>setFullname(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Amount</h1>
						<input
							className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
								placeholder="amount"
								onChange={(e)=>setAmount(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Payment Method</h1>
						<input
							className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
								placeholder="payment method"
								onChange={(e)=>setPaymentMethod(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Date</h1>
						<input
							className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
							placeholder="date"
								type="date"
								onChange={(e)=>setDate(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Description</h1>
						<input
							className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
								placeholder="description"
								onChange={(e)=>setDescription(e.target.value)}
						/>
					</div>
					<div></div>
					<button className="bg-purple-900 p-2 rounded text-white">
						Submit
					</button>
				</form>
			)}
		</div>
	);
}
