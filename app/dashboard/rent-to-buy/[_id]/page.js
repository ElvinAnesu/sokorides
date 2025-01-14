"use server"
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import LeaseDetailsForm from "@/app/components/dashboard/forms/leasedetails";
import { getLeaseById } from "@/lib/server-actions/lease";

export default async function LeasedCarDetails({params}) { 

	const { _id } = await params;
	const lease = await getLeaseById(_id) 

	// Format the date consistently
	const formattedDate = new Date("3 Jan 2024").toLocaleDateString();
	
	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Leased Vehicle"} />
			<LeaseDetailsForm lease={lease} _id={_id} />
		</div>
	);
}
