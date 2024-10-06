"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	PlusIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	TrashIcon,
	EyeOpenIcon,
} from "@radix-ui/react-icons";

const PAGE_SIZE = 10;

export default function PaymentsTable() {
	const router = useRouter();
	const [payments, setPayments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	const getPayments = async () => {
		setIsLoading(true);
		const response = await fetch("/api/payments", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		const data = await response.json();

		if (data.success) {
			setIsLoading(false);
			setPayments(data.payments);
			setTotal(data.totalPayments);
		} else {
			setIsLoading(false);
			alert(data.message);
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
			return "today";
		}

		// Check if createdAt is yesterday
		const yesterday = new Date(now);
		yesterday.setDate(now.getDate() - 1);
		if (
			dateObj.getDate() === yesterday.getDate() &&
			dateObj.getMonth() === yesterday.getMonth() &&
			dateObj.getFullYear() === yesterday.getFullYear()
		) {
			return "yesterday";
		}

		// For any day before yesterday
		const formattedDate = `${String(dateObj.getDate()).padStart(
			2,
			"0"
		)}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${String(
			dateObj.getFullYear()
		).slice(-2)}`;
		return formattedDate;
	};

	const deletePayment = async (_id, customer) => {
		const role = localStorage.getItem("role");
		if (role === "owner") {
			const confirmDelete = confirm(`Delete payment for ${customer}`);
			if (confirmDelete) {
				setIsLoading(true)
				const response = await fetch(`/api/payments/${_id}`, {
					method: "DELETE",
					headers:{"Content-Type":"application/json"}
				})
				const data = await response.json()
				if (data.success) {
					setIsLoading(false)
					alert(data.message)
					window.location.reload()
				} else {
					setIsLoading(false);
					alert(data.message);
				}
			}
		} else {
			alert("No rights to perform this action");
		}
	};

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const handleNextPage = () => {
		if (page * PAGE_SIZE < total) {
			setPage(page + 1);
		}
	};

	useEffect(() => {
		getPayments();
	}, [page]);

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

			<div className="w-full bg-gray-200 rounded p-4">
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
								<td className="text-sm font-semibold hidden md:table-cell">
									Date
								</td>
								<td className="text-sm font-semibold rounded-e-full ">
									Action
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
									<td className="text-sm flex gap-4">
										<button onClick={()=> router.push(`/dashboard/payments/${payment._id}`)}>
											<EyeOpenIcon />
										</button>
										<button
											onClick={(e) =>
												deletePayment(payment._id, payment.fullname)
											}
										>
											<TrashIcon />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				<div className="flex w-full items-full items-center justify-center gap-4 mt-4">
					<button
						className="border border-purple-900 rounded-full p-1 text-purple-900"
						onClick={handlePreviousPage}
						disabled={page === 1}
					>
						<ArrowLeftIcon />
					</button>
					<span className="text-sm">page{page}</span>
					<button
						className="border border-purple-900 rounded-full p-1 text-purple-900"
						onClick={handleNextPage}
						disabled={page * PAGE_SIZE >= total}
					>
						<ArrowRightIcon />
					</button>
				</div>
			</div>
		</div>
	);
}
