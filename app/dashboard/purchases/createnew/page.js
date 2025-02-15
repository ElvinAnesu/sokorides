"use client";
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import CreatePurchaseForm from "@/app/components/dashboard/forms/createpurchase";
import { useState, useEffect } from "react";
import { unstable_noStore as noStore } from 'next/cache';

export default function CreateNew() {
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				noStore(); // Opt out of caching
				const response = await fetch('/api/customers/all', {
					cache: 'no-store', // Ensure fresh data
					next: { revalidate: 0 } // Disable cache
				});
				const data = await response.json();
				if (data.customers) {
					setCustomers(data.customers);
				}
			} catch (error) {
				console.error('Error fetching customers:', error);
			}
		};

		fetchCustomers();
	}, []); // Empty dependency array means this runs once when component mounts

	return (
		<div className="h-full w-full flex flex-col gap-4">
			<BreadCrumb title={"Add Purchase"} />
			<CreatePurchaseForm customers={customers} />
		</div>
	);
}
