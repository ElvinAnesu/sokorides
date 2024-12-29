"use server"
import { getLatestLeases } from "@/lib/server-actions/lease";
import NotificationsCard from "@/app/components/cards/notifications";
import RentedCars from "@/app/components/cards/rentedcars";
import TransactionsCard from "@/app/components/cards/transactions";

export default async function RentToBuy() { 
	const leasedCars = await getLatestLeases()
	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
			<RentedCars leasedCars={leasedCars}/>
			<TransactionsCard />
			<NotificationsCard />
		</div>
	);
}
