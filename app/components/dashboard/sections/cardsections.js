import { getTotalCustomers, getTotalPurchases, getTotalPayments, getPendingInvoices } from "@/lib/actions";
import DashboardCard from "../cards/dashboardcard";

export default async function CardSection() {
    
    const totalCustomers = await getTotalCustomers();
    const totalPurchases = await getTotalPurchases();
	const totalPayments = await getTotalPayments();
	const pendingInvoices = await getPendingInvoices()
    return (
			<div className="flex w-full gap-4 overflow-auto">
				<DashboardCard
					type="totalPayments"
					value={`$${totalPayments.toFixed(2)}`}
				/>
				<DashboardCard
					type="outstandingInvoices"
					value={`$${pendingInvoices.toFixed(2)}`}
				/>
				<DashboardCard type="totalPurchases" value={totalPurchases} />
				<DashboardCard type="customers" value={totalCustomers} />
			</div>
		);
}