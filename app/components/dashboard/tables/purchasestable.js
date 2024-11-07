import { lusitana } from "@/app/fonts/fonts";
import { getPaginatedPurchases } from "@/lib/actions";
import {  trimName } from "@/lib/utils";
import { DeleteBtn, ViewBtn } from "../common/buttons/buttons";

export default async function PurchasesTable({ query, currentPage }) {
	const purchases = await getPaginatedPurchases(query, currentPage);
	return (
		<div className={`${lusitana.className} mt-2 flow-root`}>
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-200 p-2 md:pt-0">
					<table className="min-w-full text-gray-900">
						<thead className="rounded-lg text-left text-sm ">
							<tr>
								<th scope="col" className="px-4 py-4 font-semibold sm:pl-6">
									Customer
								</th>
								<th
									scope="col"
									className="px-3 py-4 font-semibold hidden md-table-cell"
								>
									Purchased Vehicle
								</th>
								<th
									scope="col"
									className="px-3 py-4 font-semibold hidden md-table-cell"
								>
									Vehicle Status
								</th>
								<th
									scope="col"
									className="px-3 py-4 font-semibold hidden md:table-cell"
								>
									Total Amount
								</th>
								<th
									scope="col"
									className="px-3 py-4 font-semibold hidden md:table-cell"
								>
									Current Payment
								</th>
								<th
									scope="col"
									className="px-3 py-4 font-semibold hidden md:table-cell"
								>
									Outstanding Balance
								</th>
								<th scope="col" className="relative py-2 pl-6 pr-3">
									<span className="sr-only">Action</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{purchases?.map((purchase, index) => (
								<tr
									key={index}
									className="w-full border-b py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="whitespace-nowrap px-3 py-2">
										{trimName(purchase.customerName)}
									</td>
									<td className="whitespace-nowrap px-3 py-2 hidden md-table-cell">
										{trimName(purchase.purchasedItem)}
									</td>
									<td className="whitespace-nowrap px-3 py-2 hidden md-table-cell">
										{purchase.vehicleStatus}
									</td>
									<td className="whitespace-nowrap px-3 py-2 hidden md:table-cell">
										{`$${purchase.totalPrice.toFixed(2)}`}
									</td>
									<td className="whitespace-nowrap px-3 py-2 hidden md:table-cell">
										{`$${purchase.currentPayment.toFixed(2)}`}
									</td>
									<td className="whitespace-nowrap px-3 py-2 hidden md:table-cell">
										{`$${(
											purchase.totalPrice - purchase.currentPayment
										).toFixed(2)}`}
									</td>
									<td className="whitespace-nowrap py-2 pl-6 pr-3">
										<div className="flex justify-end gap-3">
											<DeleteBtn _id={purchase._id} item={"purchase"} />
											<ViewBtn url={`/dashboard/purchases/${purchase._id}`} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
