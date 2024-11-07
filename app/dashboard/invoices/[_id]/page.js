import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import EditInvoiceForm from "@/app/components/dashboard/forms/editinvoice";
import { getInvoicecById, getAllCustomers } from "@/lib/actions";

export default async function InvoiceDetails({ params }) {
	const {_id} = params
	const [invoice, customers] = await Promise.all([ 
		getInvoicecById(_id),
		getAllCustomers()
	])
	
	return (
		<div className="w-full h-full p-4 flex flex-col gap-4">
			<BreadCrumb title={"Update Invoice"} /> 
			<EditInvoiceForm customers={customers} invoice={invoice} />
		</div>
	);
}
