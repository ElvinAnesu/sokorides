import { lusitana } from "@/app/fonts/fonts";
import { getPaginatedBatches } from "@/lib/actions";
import { DeleteBtn, ViewBtn } from "../common/buttons/buttons";
import { stringToCurrency, trimName } from "@/lib/utils";

export default async function BatchesTable({ query, currentPage }) {
	const batches = await getPaginatedBatches(query, currentPage);
	return (
		<div className={`${lusitana.className} mt-2 flow-root`}>
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-200 p-2 md:pt-0">
					<table className="min-w-full text-gray-900">
						<thead className="rounded-lg text-left text-sm ">
							<tr>
								<th scope="col" className="px-4 py-4 font-semibold sm:pl-6">
									Batch
								</th>
								<th
									scope="col"
									className="px-3 py-4 font-semibold hidden md:table-cell"
								>
									Number of Shipments
								</th>
								<th
									scope="col"
									className="px-3 py-4 font-semibold hidden md:table-cell"
								>
									Last Update
								</th>
								<th scope="col" className="relative py-2 pl-6 pr-3">
									<span className="sr-only">Action</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{batches?.map((batch, index) => (
								<tr
									key={index}
									className="w-full border-b py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="whitespace-nowrap px-3 py-2">
										{trimName(batch.batchName)}
									</td>
									<td className="whitespace-nowrap px-3 py-2 hidden md:table-cell">
										{batch.shipments.length}
									</td>
									<td className="whitespace-nowrap px-3 py-2 hidden md:table-cell">
										{batch.updates.at(-1) ? trimName(batch.updates.at(-1)) : ""}
									</td>
									<td className="whitespace-nowrap py-2 pl-6 pr-3">
										<div className="flex justify-end gap-3">
											<DeleteBtn _id={batch._id} item={"batch"} />
											<ViewBtn url={`/dashboard/batches/${batch._id}`} />
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
