"use client";
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import { addLeaseDetails } from "@/lib/server-actions/lease";
import { useActionState, use } from "react";

export default function CarDetails({ params }) {
	const { _id } = use(params);

	const [state, formAction, pending] = useActionState(
		addLeaseDetails,
		undefined
	)

	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Lease Vehicle"} />
			<form
				className="bg-white rounded shadow grid grid-cols-1 md:grid-cols-3 p-4 gap-4"
				action={formAction}
			>
				

			</form>
		</div>
	);
}
