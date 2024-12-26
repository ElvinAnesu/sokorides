import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import EditPurchaseForm from "@/app/components/dashboard/forms/editpurchase";
import { getPurchaseById, getAllCustomers } from "@/lib/actions";


export default async function PurchaseDetails(props) {
    const params = await props.params;

    const { _id } = params
    const [purchase, customers] = await Promise.all([
		getPurchaseById(_id) ,
		getAllCustomers()
	])

    return (
		<div className="w-full h-full flex flex-col gap-4">
			<BreadCrumb title={"Edit Purchase"} />
			<EditPurchaseForm  purchase={purchase} customers={customers}/>
		</div>
	);
}
