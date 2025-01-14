import {
	getTotalCustomers,
	getTotalPurchases,
	getTotalPayments,
	getPendingInvoices,
} from "@/lib/actions";
import DashboardCard from "../cards/dashboardcard";
import { Suspense } from 'react';
import { unstable_noStore as noStore } from 'next/cache';

// Create loading cards for Suspense fallback
function LoadingCards() {
	return (
		<div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
			{[...Array(4)].map((_, i) => (
				<div key={i} className="animate-pulse bg-gray-200 rounded-lg p-6 h-32" />
			))}
		</div>
	);
}

// Create a separate async component for the cards
async function Cards() {
	// Opt out of caching for this component
	noStore();
	
	const totalCustomers = await getTotalCustomers();
	const totalPurchases = await getTotalPurchases();
	const totalPayments = await getTotalPayments();
	const pendingInvoices = await getPendingInvoices();

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
				value={`$${formatNumber(totalPayments.toFixed(2))}`}
				color="text-green-600"
			/>
			<DashboardCard
				type="outstandingInvoices"
				value={`$${formatNumber(pendingInvoices.toFixed(2))}`}
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

// Main component with Suspense boundary
export default function CardSection() {
	return (
		<Suspense fallback={<LoadingCards />}>
			<Cards />
		</Suspense>
	);
}
