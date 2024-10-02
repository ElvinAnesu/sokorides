"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	EyeOpenIcon,
	TrashIcon,
	PlusIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
} from "@radix-ui/react-icons";

const PAGE_SIZE = 10;

export default function PurchasesTable() {
	const router = useRouter();
	const [purchases, setPurchasess] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	const getPurchases = async () => {
		setIsLoading(true);

		const response = await fetch(
			`/api/purchases?page=${page}&pageSize=${PAGE_SIZE}`,
			{
				method: "GET",
				headers: { "Content-Type": "applicaction/json" },
			}
		);
		const data = await response.json();
		if (data.success) {
			setPurchasess(data.purchases);
			setTotal(data.totalPurchases);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			alert(data.message);
		}
	};
	const deletePurchase = async (_id) => {
		const confirmDelete = confirm("Delete this purchase record");
		if (confirmDelete) {
			setIsLoading(true);
			const response = await fetch(`/api/purchases/${_id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			const data = await response.json();
			if (data.success) {
				setIsLoading(false);
				alert(data.message);
				window.location.reload();
			} else {
				setIsLoading(false);
				alert(data.message);
			}
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
		getPurchases();
	}, [page]);

	return (
		<div className="flex flex-col w-full h-full gap-2">
			<div className="flex w-full items-center justify-end">
				<button
					className="bg-purple-900 text-white  text-sm rounded px-2 py-2 flex items-center gap-1"
					onClick={() => router.push("/dashboard/purchases/createnew")}
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
								<td className="px-2 text-sm font-semibold">Customer</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Purchased Vehicle
								</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Vehicle Status
								</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Total Price
								</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Current Payments
								</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Outstanding
								</td>
								<td className="px-2 rounded-e-full text-sm font-semibold">
									Action
								</td>
							</tr>
							{purchases.map((purchase, index) => (
								<tr className="border-b border-gray-500" key={index}>
									<td className="px-2 rounded-s-full text-sm">
										{(page - 1) * PAGE_SIZE + index + 1}
									</td>
									<td className="px-2 rounded-s-full text-sm">
										{purchase.customerName}
									</td>
									<td className="text-sm hidden md:table-cell">
										{purchase.purchasedItem}
									</td>
									<td className="text-sm hidden md:table-cell">
										{purchase.vehicleStatus}
									</td>
									<td className="text-sm hidden md:table-cell">
										${purchase.totalPrice.toFixed(2)}
									</td>
									<td className="text-sm hidden md:table-cell">
										${purchase.currentPayment.toFixed(2)}
									</td>
									<td className="text-sm hidden md:table-cell">
										$
										{(purchase.totalPrice - purchase.currentPayment).toFixed(2)}
									</td>
									<td className="px-2 rounded-e-full text-sm flex gap-2">
										<button
											onClick={() =>
												router.push(`/dashboard/purchases/${purchase._id}`)
											}
										>
											<EyeOpenIcon />
										</button>
										<button onClick={() => deletePurchase(purchase._id)}>
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
