import { lusitana } from "@/app/fonts/fonts";
import { getLatestPurchases } from "@/lib/actions";
import { trimName } from "@/lib/utils";

export default async function RecentPurchases() {
    const latestPurchases = await getLatestPurchases()
    return (
			<div className="w-full flex flex-col gap-4">
				<h1 className={`${lusitana.className} text-xl`}>Recent Purchases</h1>
				<div className="w-full rounded bg-white shadow-sm p-2">
					<table
						className={`${lusitana.className} w-full bg-gray-200 rounded text-sm`}
					>
						<thead>
							<tr className="font-semibold border-b border-white">
								<td className="p-1">Purchased Vehicle</td>
								<td className="p-1">Customer</td>
								<td className="p-1">Vehicle Cost</td>
								<td className="p-1">Amount Paid</td>
							</tr>
						</thead>
						<tbody>
							{latestPurchases.map((purchase, index) => (
								<tr className="border-t border-white" key={index}>
									<td className="p-1">{trimName(purchase.purchasedItem)}</td>
									<td className="p-1">{trimName(purchase.customerName)}</td>
									<td className="p-1">{`$${purchase.totalPrice.toFixed(
										2
									)}`}</td>
									<td className="p-1">{`$${purchase.currentPayment.toFixed(
										2
									)}`}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
}