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

export default function DashboardCard({ value, type, color = "text-gray-900" }) {
	const Icon = cardMap[type].icon;
	return (
		<div className="rounded-lg bg-white border border-gray-200 p-6 shadow-sm w-full max-w-xs transform transition-transform hover:scale-105">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-sm font-medium text-gray-500">{cardMap[type].title}</h3>
				{Icon && <Icon className="h-6 w-6 text-purple-500" />}
			</div>
			<p
				className={`${lusitana.className} text-2xl md:text-4xl font-semibold ${color} text-center`}
			>
				{value}
			</p>
		</div>
	);
}
