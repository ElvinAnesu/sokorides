import {
	BanknotesIcon,
	ClockIcon,
	UserGroupIcon,
	ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/fonts/fonts";

const cardMap = {
	customers: {
		icon: UserGroupIcon,
		title: "Total Customers",
		url: "",
	},
	outstandingInvoices: {
		icon: ClockIcon,
		title: "Outstanding Invoices",
		url: "",
	},
	totalPayments: {
		icon: BanknotesIcon,
		title: "Total Payments",
		url: "",
	},
	totalPurchases: {
		icon: ShoppingCartIcon,
		title: "Vehicles Sold",
		url: "",
	},
};

export default function DashboardCard({value, type}) {
    const Icon = cardMap[type].icon
	return (
		<div className="rounded-xl  bg-purple-900 p-2 shadow w-full text-white">
			<div className="flex p-4 items-center">
				{Icon ? <Icon className="h-5 w-5" /> : null}
				<h3 className="ml-2 text-xs md:text-sm font-semibold ">{cardMap[type].title}</h3>
			</div>
			<p
				className={`${lusitana.className} text-gray-700 truncate-rounded rounded-xl bg-white px-4 py-8 text-center text-2xl`}
			>
				{value}
			</p>
		</div>
	);
}
