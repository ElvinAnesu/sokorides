import { lusitana } from "@/app/fonts/fonts";
import { getLatestPayments } from "@/lib/actions";
import { formatDate, trimName } from "@/lib/utils";

export default async function RecentPayments() {
	const latestPayments = await getLatestPayments();
	return (
		<div className="w-full flex flex-col gap-4">
			<h1 className={`${lusitana.className} text-xl`}>Recent Payments</h1>
			<div className="w-full rounded bg-white shadow-sm p-2">
				<table
					className={`${lusitana.className} w-full bg-gray-200 rounded text-sm`}
				>
					<thead>
						<tr className="font-semibold border-b border-white">
							<td className="p-1">Customer</td>
							<td className="p-1">Amount</td>
							<td className="p-1">Date</td>
						</tr>
					</thead>
					<tbody>
						{latestPayments.map((payment, index) => (
							<tr className="border-t border-white" key={index}>
								<td className="p-1">{trimName(payment.fullname)}</td>
								<td className="p-1">{`$${payment.amount.toFixed(2)}`}</td>
								<td className="p-1">{formatDate(payment.createdAt)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
