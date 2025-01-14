import {
	getTotalCustomers,
	getTotalPurchases,
	getTotalPayments,
	getPendingInvoices,
} from "@/lib/actions";
import DashboardCard from "../cards/dashboardcard";

export const dynamic = "force-dynamic";

export default async function CardSection() {
	const totalCustomers = await getTotalCustomers() || 0;
	const totalPurchases = await getTotalPurchases() || 0;
	const totalPayments = await getTotalPayments() || 0;
	const pendingInvoices = await getPendingInvoices() || 0;

	// Formatter to add thousand separators
	const formatNumber = (number) => {
		return new Intl.NumberFormat("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(number);
	};

	return (
		<div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
			<DashboardCard
				type="totalPayments"
				value={`$${formatNumber(totalPayments?.toFixed(2))}`}
				color="text-green-600"
			/>
			<DashboardCard
				type="outstandingInvoices"
				value={`$${formatNumber(pendingInvoices?.toFixed(2))}`}
				color="text-red-600"
			/>
			<DashboardCard
				type="totalPurchases"
				value={totalPurchases}
				color="text-purple-700"
			/>
			<DashboardCard
				type="customers"
				value={totalCustomers}
				color="text-purple-700"
			/>
		</div>
	);
}
