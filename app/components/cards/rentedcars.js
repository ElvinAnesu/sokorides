



export default function RentedCars() {
    return (
			<div className="flex flex-col rounded bg-white shadow">
				<div className="w-full flex bg-purple-900 p-2 rounded-t">
					<h1 className="text-white">Leased Cars(2)</h1>
				</div>
				<div className="p-4">
					<div className="flex items-center justify-between">
						<h1 className="font-bold">Elvin Kakomo</h1>
						<h1 className="font-bold">Honda Vezel</h1>
					</div>
					<div className="flex items-center justify-between text-xs border-b pb-2">
						<h1 className="font-bold">
							Total Price: <span className="text-sm text-green-600">$3000</span>
						</h1>
						<h1 className="font-bold">
							Current payments:{" "}
							<span className="text-sm text-amber-600">$1500</span>
						</h1>
					</div>
				</div>
			</div>
		);
}