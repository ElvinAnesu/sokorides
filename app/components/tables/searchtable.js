import Searchbar from '../dashboard/common/searchbar';
import { lusitana } from '@/app/fonts/fonts';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';


export default function SearchTable({ data, columns, type }) { 
    
    return (
			<div className="flex flex-col w-full py-4 gap-4">
				<Searchbar />
				<div className={`${lusitana.className} mt-2 flow-root`}>
					<div className="inline-block min-w-full align-middle">
						<div className="rounded-lg bg-gray-200 p-2 md:pt-0">
							<table className="min-w-full text-gray-900 text-xs">
								<thead className="rounded-lg text-left text-sm ">
									<tr>
										{columns?.map((column) => (
											<th
												key={column.accessor}
												scope="col"
												className="px-4 py-4 font-semibold sm:pl-6 text-left"
											>
												{column.Header}
											</th>
										))}
										<th
											scope="col"
											className="px-4 py-4 font-semibold sm:pl-6 text-left"
										>
											Action
										</th>
									</tr>
								</thead>
								<tbody className="bg-white">
									{data?.length > 0 ? (
										data.map((item, index) => (
											<tr
												key={index}
												className="w-full border-b py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
											>
												{columns.map((column) => (
													<td
														key={column.accessor}
														className="whitespace-nowrap px-3 py-2"
													>
														{item[column.accessor]}
													</td>
												))}
												<td className="whitespace-nowrap px-3 py-2 text-left">
													<Link
														href={
															type === "documents"
																? item.url
																: `/dashboard/rent-to-buy/${item._id}`
														}
														className=" flex items-center justify-center gap-2"
													>
														View
														<ArrowRightIcon />
													</Link>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={columns?.length +1} className="text-center p-2">
												No data found
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
};