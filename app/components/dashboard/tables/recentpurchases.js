import { lusitana } from "@/app/fonts/fonts";
import { getLatestPurchases } from "@/lib/actions";
import { trimName } from "@/lib/utils";

export default async function RecentPurchases() {
	const latestPurchases = await getLatestPurchases();
	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className={`${lusitana.className} text-2xl font-bold text-purple-700 ml-2`}>Recent Purchases</h1>
			<div className="w-full rounded-lg bg-white shadow-md p-4">
				<table className="w-full">
					<thead>
					<tr className="text-left text-gray-600 text-sm font-semibold border-b border-gray-200">
						<th className="p-3 whitespace-nowrap overflow-hidden">Purchased Vehicle</th>
						<th className="p-3 whitespace-nowrap overflow-hidden">Customer</th>
						<th className="p-3 whitespace-nowrap overflow-hidden">Vehicle Cost</th>
						<th className="p-3 whitespace-nowrap overflow-hidden">Amount Paid</th>
					</tr>
					</thead>
					<tbody>
					{latestPurchases.map((purchase, index) => (
						<tr
							key={index}
							className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none"
						>
							<td className="p-3 text-gray-700">{trimName(purchase.purchasedItem)}</td>
							<td className="p-3 text-gray-700">{trimName(purchase.customerName)}</td>
							<td className="p-3 text-gray-700">{`$${purchase.totalPrice.toFixed(2)}`}</td>
							<td className="p-3 text-gray-700">{`$${purchase.currentPayment.toFixed(2)}`}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
