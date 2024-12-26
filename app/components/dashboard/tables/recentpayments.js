import { lusitana } from "@/app/fonts/fonts";
import { getLatestPayments } from "@/lib/actions";
import { formatDate, trimName } from "@/lib/utils";

export default async function RecentPayments() {
	const latestPayments = await getLatestPayments();
	return (
		<div className="w-full flex flex-col gap-2 mt-3">
			<h1
				className={`${lusitana.className} text-xl font-bold text-purple-700 ml-2`}
			>
				Recent Payments
			</h1>
			<div className="w-full rounded-lg bg-white shadow-md p-2">
				<table className="w-full text-sm">
					<thead>
						<tr className="text-left text-gray-600 text-sm font-semibold border-b border-gray-200">
							<th className="p-3 whitespace-nowrap overflow-hidden">
								Customer
							</th>
							<th className="p-3 whitespace-nowrap overflow-hidden">Amount</th>
							<th className="p-3 whitespace-nowrap overflow-hidden hidden md:table-cell">
								Date
							</th>
						</tr>
					</thead>
					<tbody>
						{latestPayments.map((payment, index) => (
							<tr
								key={index}
								className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none"
							>
								<td className="p-3 text-gray-500">
									{trimName(payment.fullname)}
								</td>
								<td className="p-3 text-gray-500">{`$${payment.amount.toFixed(
									2
								)}`}</td>
								<td className="p-3 text-gray-500 hidden md:table-cell">
									{formatDate(payment.createdAt)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
