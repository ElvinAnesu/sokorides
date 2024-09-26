"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EyeOpenIcon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";

export default function PaymentsTable() {
	const router = useRouter();
	const [payments, setPayments] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	const getPayments = async () => {
		setIsLoading(true)
        const response = await fetch("/api/payments", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        
        const data = await response.json()

		if (data.success) {
			setIsLoading(false)
            setPayments(data.payments)
		} else {
			setIsLoading(false)
            alert(data.message)
        }
    };

      const formatDate = (date) => {
				const dateObj = new Date(date);
				const now = new Date();

				// Check if createdAt is today
				if (
					dateObj.getDate() === now.getDate() &&
					dateObj.getMonth() === now.getMonth() &&
					dateObj.getFullYear() === now.getFullYear()
				) {
					const hours = String(dateObj.getHours()).padStart(2, "0");
					const minutes = String(dateObj.getMinutes()).padStart(2, "0");
					return `today ${hours}:${minutes}`;
				}

				// Check if createdAt is yesterday
				const yesterday = new Date(now);
				yesterday.setDate(now.getDate() - 1);
				if (
					dateObj.getDate() === yesterday.getDate() &&
					dateObj.getMonth() === yesterday.getMonth() &&
					dateObj.getFullYear() === yesterday.getFullYear()
				) {
					const hours = String(dateObj.getHours()).padStart(2, "0");
					const minutes = String(dateObj.getMinutes()).padStart(2, "0");
					return `yesterday ${hours}:${minutes}`;
				}

				// For any day before yesterday
				const formattedDate = `${String(dateObj.getDate()).padStart(
					2,
					"0"
				)}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${String(
					dateObj.getFullYear()
				).slice(-2)}`;
				const hours = String(dateObj.getHours()).padStart(2, "0");
				const minutes = String(dateObj.getMinutes()).padStart(2, "0");
				return `${formattedDate} ${hours}:${minutes}`;
			};
	const deletePayment = async (_id) => {};

	useEffect(() => {
		getPayments();
	}, []);

	return (
		<div className="flex flex-col w-full h-full gap-2 p-4">
			<div className="flex w-full items-center justify-end">
				<button
					className="bg-purple-900 rounded text-sm text-white px-2 py-2 flex gap-1 items-center"
					onClick={() => router.push("/dashboard/payments/createnew")}
				>
					<PlusIcon />
					Add New
				</button>
			</div>
			<div className="w-full h-full bg-gray-200 rounded p-4">
				{isLoading ? (
					<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
						<div className="flex flex-col items-center justify-center  w-full h-full">
							<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
						</div>
					</div>
				) : (
					<table className="w-full">
						<tbody>
							<tr className="px-2 bg-purple-900 text-white rounded-full">
								<td className="px-2 rounded-s-full text-sm font-semibold">#</td>
								<td className="px-2  text-sm font-semibold">Customer</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Description
								</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Amount
								</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Payment Method
								</td>
								<td className="text-sm font-semibold rounded-e-full hidden md:table-cell">
									Date
								</td>
							</tr>
							{payments.map((payment, index) => (
								<tr className="border-b border-gray-500" key={index}>
									<td className="px-2 rounded-s-full text-sm">{index + 1}</td>
									<td className="px-2 rounded-s-full text-sm">
										{payment.fullname}
									</td>
									<td className="text-sm hidden md:table-cell">
										{payment.description}
									</td>
									<td className="text-sm hidden md:table-cell">
										{payment.amount}
									</td>
									<td className="text-sm hidden md:table-cell">
										{payment.paymentMethod}
									</td>
									<td className="text-sm hidden md:table-cell">
										{formatDate(payment.date)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
