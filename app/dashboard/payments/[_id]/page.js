import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import EditPaymentForm from "@/app/components/dashboard/forms/editpayment";
import { getPaymentById } from "@/lib/actions";

export default async function PaymentDetails({ params }) {

	const { _id } = params
	const payment  = await getPaymentById(_id)
	return (
		<div className="flex flex-col w-full h-full gap-4 p-4">
			<BreadCrumb title={"Edit Payment"} />
			<EditPaymentForm payment={payment} />
		</div>
	);
}
