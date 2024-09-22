"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";

export default function PurchasesTable() {
	const router = useRouter();
	const [purchases, setPurchasess] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getPurchases = async () => {
		setIsLoading(true);
		const response = await fetch("/api/purchases", {
			method: "GET",
			headers: { "Content-Type": "applicaction/json" },
		});
		const data = await response.json();
		if (data.success) {
			setPurchasess(data.purchases);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			alert(data.message);
		}
	};
  const deletePurchase = async (_id) => {
    const confirmDelete = confirm("Delete this purchase record")
    if (confirmDelete) {
      setIsLoading(true)
      const response = await fetch(`/api/purchases/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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
  };

	useEffect(() => {
		getPurchases();
	}, []);

	return (
		<div className="flex flex-col w-full h-full gap-2">
			<div className="flex w-full items-center justify-end">
				<button
					className="border border-gray-900 rounded px-4 py-2"
					onClick={() => router.push("/dashboard/purchases/createnew")}
				>
					Add New
				</button>
			</div>
			<div className="w-full h-full bg-gray-200 rounded p-4">
				{isLoading ? (
					<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
						<div className="flex flex-col items-center justify-center  w-full h-full">
							<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
						</div>
					</div>
				) : (
					<table className="w-full">
						<tbody>
							<tr className="px-2 bg-gray-900 text-white rounded-full">
								<td className="px-2 rounded-s-full text-sm font-semibold">
									Customer
								</td>
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
										{purchase.customerName}
									</td>
									<td className="text-sm hidden md:table-cell">
										{purchase.purchasedItem}
									</td>
									<td className="text-sm hidden md:table-cell">
										{purchase.vehicleStatus}
									</td>
									<td className="text-sm hidden md:table-cell">
										{purchase.totalPrice}
									</td>
									<td className="text-sm hidden md:table-cell">
										{purchase.currentPayment}
									</td>
									<td className="text-sm hidden md:table-cell">
										{purchase.totalPrice - purchase.currentPayment}
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
			</div>
		</div>
	);
}
