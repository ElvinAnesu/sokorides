


const transactions = [
	{
		date: "01 Dec 2024",
		description: "Initial deposit for Honda Fit gke rent to buy",
		amount: 3000,
	},
	{
		date: "01 Dec 2024",
		description: "Initial deposit for Honda Fit gke rent to buy",
		amount: 3000,
	},
	{
		date: "01 Dec 2024",
		description: "Initial deposit for Honda Fit gke rent to buy",
		amount: 3000,
	},
];

export default function TransactionsTable() {
    return (
			<div className="w-full rounded shadow bg-white">
				<div className="rounded-t bg-purple-900 p-2">
					<h5 className="text-white">Transaction History</h5>
				</div>
				<div className="flex p-2">
					<input className="w-full border rounded h-10 px-2" placeholder="search..." />
				</div>
				<div className="md:hidden p-4 bg-gray-100">
					<table className="min-w-full text-sm">
						<tbody>
							{transactions.map((_transaction, index) => (
								<tr key={index}>
									<td>
										<div className="bg-white rounded p-2 mb-2">
											<div className="border-b flex items-center justify-between">
												<div className="text-left py-2 text-xl font-semibold">
													${_transaction.amount}.00
												</div>
												<div className="text-right px-4 rounded-full  py-1 bg-gray-100 text-xs">
													{_transaction.date}
												</div>
											</div>
											<div>
												<div className="text-left py-2">
													{_transaction.description}
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
								<th className="w-1/5 text-right py-2">AMOUNT</th>
							</tr>
						</thead>
						<tbody>
							{transactions.map((_transaction, index) => (
								<tr className="border-b" key={index}>
									<td className="w-1/5 text-left py-2">{_transaction.date}</td>
									<td className="w-1/5 text-left py-2">
										{_transaction.description}
									</td>
									<td className="w-1/5 text-right py-2">
										${_transaction.amount}.00
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
}