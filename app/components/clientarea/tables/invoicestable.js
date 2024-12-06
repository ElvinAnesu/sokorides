const invoices = [
	{
		date: "01 Dec 2024",
		description: "Initial deposit for Honda Fit gke rent to buy",
		amount: 3000,
		status: "Pending",
	},
	{
		date: "01 Dec 2024",
		description: "Initial deposit for Honda Fit gke rent to buy",
		amount: 3000,
		status: "Pending",
	},
	{
		date: "01 Dec 2024",
		description: "Initial deposit for Honda Fit gke rent to buy",
		amount: 3000,
		status: "Pending",
	},
];

export default function InvoicesTable() {
	return (
		<div className="w-full rounded shadow bg-white">
			<div className="rounded-t bg-purple-900 p-2">
				<h5 className="text-white">Invoices</h5>
			</div>
			<div className="flex p-2">
				<input
					className="w-full border rounded h-10 px-2"
					placeholder="search..."
				/>
			</div>
			<div className="md:hidden p-4 bg-gray-100">
				<table className="min-w-full text-sm">
					<tbody>
						{invoices.map((_invoice, index) => (
							<tr key={index}>
								<td>
									<div className="bg-white rounded p-2 mb-2">
										<div className="border-b flex items-center justify-between py-2">
											<div className="text-left py-2 text-xl font-semibold">
												${_invoice.amount}.00
											</div>
											<div className="text-right  text-xs">
												{_invoice.date}
												<div className="bg-amber-200 text-xs px-4 py-1 rounded-full">
													{_invoice.status}
												</div>
											</div>
										</div>
										<div className="py-2">
											<div className="text-left py-2">
												{_invoice.description}
											</div>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="hidden md:block p-4">
				<table className="min-w-full text-sm">
					<thead>
						<tr className="border-">
							<th className="w-1/5 text-left py-2">DATE</th>
							<th className="w-3/5 text-left py-2">DESCRIPTION</th>
							<th className="w-3/5 text-left py-2">DESCRIPTION</th>
							<th className="w-1/5 text-right py-2">AMOUNT</th>
						</tr>
					</thead>
					<tbody>
						{invoices.map((_invoice, index) => (
							<tr className="border-b" key={index}>
								<td className="w-1/5 text-left py-2">{_invoice.date}</td>
								<td className="w-1/5 text-left py-2">{_invoice.description}</td>
								<td className="w-1/5 text-left py-2">
									<span className="bg-amber-200 text-xs px-4 py-1 rounded-full">
										{_invoice.status}
									</span>
								</td>
								<td className="w-1/5 text-right py-2">${_invoice.amount}.00</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
