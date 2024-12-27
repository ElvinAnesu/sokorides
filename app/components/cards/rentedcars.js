"use server"
import { getLatestLeases } from "@/lib/server-actions/lease";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";


export default async function RentedCars() { 
	const leasedCars = await  getLatestLeases()
	return (
		<div className="flex flex-col rounded bg-white shadow">
			<div className="w-full flex bg-purple-900 p-2 rounded-t flex items-center justify-between">
				<h1 className="text-white">Leased Cars</h1>
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
					<div className="flex flex-col p-4" key={index}>
						<div className="flex items-center justify-between">
							<h1 className="font-bold">
								{leasedCar.clientName} {leasedCar.clientSurname}
							</h1>
							<h1 className="font-bold">{leasedCar.leasedCar}</h1>
						</div>
						<div className="flex flex-col text-xs border-b">
							<h1 className="font-bold">
								Current Payments:{" "}
								<span className="text-green-600  text-xl">
									${leasedCar?.downPayment?.toFixed(2)}
								</span>
							</h1>
							<h1 className="font-bold">
								Outstanding balance:{" "}
								<span className="text-xl text-amber-600">
									${(leasedCar.totalPrice - leasedCar.downPayment)?.toFixed(2)}
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
