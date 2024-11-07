import { lusitana } from "@/app/fonts/fonts";
import { getPaginatedInvoices } from "@/lib/actions";
import { formatDate, trimName } from "@/lib/utils";
import InvoiceStatus from "../common/badges/invoicestatus";
import { DeleteBtn, ViewBtn } from "../common/buttons/buttons";
import { deleteInvoice } from "@/lib/actions";
import { ownerAction } from "@/lib/utils";


export default async function InvoicesTable({query, currentPage}) {

	const invoices = await getPaginatedInvoices(query, currentPage)
	const deleteConfirmed = async () => {
		if (ownerAction()) {
			const confirmDelete = confirm(
				"Are you sureyou want to delete this item?"
			);
			if (confirmDelete) {
				await deleteInvoice(_id);
			}
		} else {
			alert("user not authorized to perform ths action");
		}
	};

    return (
			<div className={`${lusitana.className} mt-2 flow-root`}>
				<div className="inline-block min-w-full align-middle">
					<div className="rounded-lg bg-gray-200 p-2 md:pt-0">
						<table className="min-w-full text-gray-900 text-xs">
							<thead className="rounded-lg text-left text-sm ">
								<tr>
									<th scope="col" className="px-4 py-4 font-semibold sm:pl-6">
										Customer
									</th>
									<th
										scope="col"
										className="px-3 py-4 font-semibold hidden md:table-cell"
									>
										Description
									</th>
									<th
										scope="col"
										className="px-3 py-4 font-semibold hidden md-table-cell"
									>
										Amount
									</th>
									<th
										scope="col"
										className="px-3 py-4 font-semibold hidden md-table-cell"
									>
										Status
									</th>
									<th
										scope="col"
										className="px-3 py-4 font-semibold hidden md:table-cell"
									>
										Date
									</th>
									<th scope="col" className="relative py-2 pl-6 pr-3">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{invoices?.map((invoice, index) => (
									<tr
										key={index}
										className="w-full border-b py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
									>
										<td className="whitespace-nowrap px-3 py-2">
											{trimName(invoice.customername)}
										</td>
										<td className="whitespace-nowrap px-3 py-2 hidden md:table-cell">
											{invoice.description}
										</td>
										<td className="whitespace-nowrap px-3 py-2 hidden md-table-cell">
											{`$${invoice.amount.toFixed(2)}`}
										</td>
										<td className="whitespace-nowrap px-3 py-2 hidden md-table-cell">
											<InvoiceStatus status={invoice.isPaid} />
										</td>
										<td className="whitespace-nowrap px-3 py-2 hidden md:table-cell">
											{formatDate(invoice.createdAt.toString())}
										</td>
										<td className="whitespace-nowrap py-2 pl-6 pr-3">
											<div className="flex justify-end gap-3">
												<DeleteBtn _id={invoice._id} item={"invoice"} />
												<ViewBtn url={`/dashboard/invoices/${invoice._id}`} />
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
