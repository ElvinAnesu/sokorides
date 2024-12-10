


export default function TransactionsCard() {
	return (
		<div className="flex flex-col rounded bg-white shadow">
			<div className="w-full flex bg-purple-900 p-2 rounded-t">
				<h1 className="text-white">Payments</h1>
			</div>
			<div className="p-4">
				<div className="flex items-center justify-between border-b p-2">
					<h1 className="font-bold">Upcoming payments</h1>
					<h1 className="font-bold text-green-600 text-3xl">$4000</h1>
				</div>
				<div className="flex items-center justify-between border-b p-2">
					<h1 className="font-bold">Outsanding Balances</h1>
					<h1 className="font-bold text-amber-600 text-3xl">$20000</h1>
				</div>
				<div className="flex items-center justify-between border-b p-2">
					<h1 className="font-bold">Overdue Payments</h1>
					<h1 className="font-bold text-red-600 text-3xl">$8000</h1>
				</div>
			</div>
		</div>
	);
}
