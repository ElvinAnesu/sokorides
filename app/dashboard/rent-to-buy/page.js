"use server"
import NotificationsCard from "@/app/components/cards/notifications";
import RentedCars from "@/app/components/cards/rentedcars";
import TransactionsCard from "@/app/components/cards/transactions";

export default async function RentToBuy() {
	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
			<RentedCars />
			<TransactionsCard />
			<NotificationsCard />
		</div>
	);
}
