import DocumnetsCard from "@/app/components/cards/documentscard";
import NotificationsCard from "@/app/components/cards/notifications";
import PaymentsCard from "@/app/components/cards/paymentscard";
import RentedCars from "@/app/components/cards/rentedcars";
import TransactionsCard from "@/app/components/cards/transactions";
import Link from "next/link";

export default function RentToBuy() {
	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
			<RentedCars />
			<PaymentsCard />
			<TransactionsCard />
			<NotificationsCard />
			<DocumnetsCard />
		</div>
	);
}
