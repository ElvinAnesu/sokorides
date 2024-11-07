import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import CreatePaymentForm from "@/app/components/dashboard/forms/createpaymentform";

export default function CreateNew() {

	return (
		<div className="flex flex-col w-full h-full gap-4 p-4">
			<BreadCrumb title={"Add New Payment"} />
			<CreatePaymentForm />
		</div>
	);
}
