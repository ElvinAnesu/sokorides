import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import CreatePurchaseForm from "@/app/components/dashboard/forms/createpurchase";
import { getAllCustomers } from "@/lib/actions";

export default async function CreateNew() {
const customers = await getAllCustomers();
	return (
		<div className="h-full w-full flex flex-col gap-4">
			<BreadCrumb title={"Add Purchase"} />
			<CreatePurchaseForm customers={customers} />
		</div>
	);
}
