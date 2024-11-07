import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import CreateShipmentForm from "@/app/components/dashboard/forms/createshipment";
import { getAllCustomers } from "@/lib/actions";

export default async function CreateNew() {
	const customers = await getAllCustomers();
	return (
		<div className="h-full w-full flex flex-col gap-4">
			<BreadCrumb title={"Add Purchase"} />
			<CreateShipmentForm customers={customers} />
		</div>
	);
}
