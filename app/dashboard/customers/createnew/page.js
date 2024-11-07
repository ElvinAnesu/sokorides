import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import CreateCustomerForm from "@/app/components/dashboard/forms/createcustomer";


export default function CreateNew() {
	return (
		<div className="h-full w-full flex flex-col gap-4">
			<BreadCrumb title={"Create New Customer"} />
			<CreateCustomerForm />
		</div>
	);
}
