import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import EditPaymentForm from "@/app/components/dashboard/forms/editpayment";
import { getPaymentById } from "@/lib/actions";
import Link from "next/link";

export default async function PaymentDetails(props) {
    const params = await props.params;

    const { _id } = params
    const payment  = await getPaymentById(_id)
    return (
		<div className="flex flex-col w-full h-full gap-4 p-4">
			<BreadCrumb title={"Edit Payment"} /> 
			<Link href={`/dashboard/payments`} className="text-blue-500 hover:text-blue-700">View users payments</Link>
			<EditPaymentForm payment={payment} />
		</div>
	);
}
