





export default function CarDetailsForm() {
	return (
		<div className="bg-white rounded shadow">
			<div className="rounded-t bg-purple-900 p-2">
				<h5 className="text-white">Vehilce Details</h5>
			</div>
			<form className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
				<div className="w-full">
					<h5 className="text-sm">Vehicle</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"Honda Vezel"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Model</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"CX5"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Total Price</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"3000"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Current Payment</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"$4500"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Outstanding Balance</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"$3100"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Next Payment Date</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"31 Dec 2024"}
						disabled
					/>
				</div>
			</form>
		</div>
	);
}