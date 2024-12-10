export default function RentedCars({leasedCars}) {
	return (
		<div className="flex flex-col rounded bg-white shadow">
			<div className="w-full flex bg-purple-900 p-2 rounded-t">
				<h1 className="text-white">Leased Cars(2)</h1>
			</div>
			{leasedCars?.length ?
				leasedCars.map((leasedCar, index) => (
					<div className="p-4" key={index}>
						<div className="flex items-center justify-between">
							<h1 className="font-bold">{leasedCar.customerName}</h1>
							<h1 className="font-bold">{leasedCar.model}</h1>
						</div>
						<div className="flex items-center justify-between text-xs border-b pb-2">
							<h1 className="font-bold">
								Current Payments:{" "}
								<span className="text-sm text-green-600">
									{leasedCar.currentPayments}
								</span>
							</h1>
							<h1 className="font-bold">
								Outstanding balance:{" "}
								<span className="text-sm text-amber-600">
									{leasedCar.currentPayments}
								</span>
							</h1>
						</div>
					</div>
				)) : (
					<div className="flex item-center justify-center p-4">
						<h1>No cars on rent to buy</h1>
						</div>
				)}
		</div>
	);
}
