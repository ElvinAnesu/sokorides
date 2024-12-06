export default function PurchaseDetailsForm() {
	return (
		<div className="bg-white rounded shadow">
			<div className="rounded-t bg-purple-900 p-2">
				<h5 className="text-white">Payments</h5>
			</div>
			<form className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
				<div className="w-full">
					<h5 className="text-sm">Current Payment</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"$30000"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Outstanding Balance</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"$2000"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Last Payment</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"1000"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Next Dayment Date</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"31 Dec 2024"}
						disabled
					/>
				</div>
				<div className="w-full">
					<button className=" w-full bg-purple-900 p-2 rounded text-white">
						View All Payments
					</button>
				</div>
				<div className="w-full">
					<button className=" w-full bg-purple-900 p-2 rounded text-white">
						Make Payment
					</button>
				</div>
			</form>
		</div>
	);
}
