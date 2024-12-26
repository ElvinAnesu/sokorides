"use server"
import { getLatestLeases } from "@/lib/server-actions/lease";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";


export default async function RentedCars() { 
	const leasedCars = await  getLatestLeases()
	return (
		<div className="flex flex-col rounded bg-white shadow">
			<div className="w-full flex bg-purple-900 p-2 rounded-t flex items-center justify-between">
				<h1 className="text-white">Leased Cars(2)</h1>
				<Link
					href={"/dashboard/rent-to-buy/leasedcars"}
					className="text-white flex items-center gap-2"
				>
					View
					<ArrowRightIcon className="w-4 h-4" fontSize={24} />
				</Link>
			</div>
			{leasedCars?.length ? (
				leasedCars.map((leasedCar, index) => (
					<div className="p-4" key={index}>
						<div className="flex items-center justify-between">
							<h1 className="font-bold">
								{leasedCar.clientName} {leasedCar.clientSurname}
							</h1>
							<h1 className="font-bold">{leasedCar.leasedCar}</h1>
						</div>
						<div className="flex items-center justify-between text-xs border-b pb-2">
							<h1 className="font-bold">
								Current Payments:{" "}
								<span className="text-sm text-green-600">
									{leasedCar.downPayment}
								</span>
							</h1>
							<h1 className="font-bold">
								Outstanding balance:{" "}
								<span className="text-sm text-amber-600">
									{leasedCar.totalPrice - leasedCar.downPayment}
								</span>
							</h1>
						</div>
					</div>
				))
			) : (
				<div className="flex item-center justify-center p-4">
					<h1>No cars on rent to buy</h1>
				</div>
			)}
		</div>
	);
}
