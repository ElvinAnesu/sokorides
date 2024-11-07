import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import CreateInvoiceForm from "@/app/components/dashboard/forms/createinivoice";
import {getAllCustomers} from "@/lib/actions";

export default async function Createnew() {
	const customers = await getAllCustomers()
	return (
		<div className="w-full h-full p-4 flex flex-col gap-4">
			<BreadCrumb title={"Create Invoice"} />
			<CreateInvoiceForm customers={customers} />
		</div>
	);
}
