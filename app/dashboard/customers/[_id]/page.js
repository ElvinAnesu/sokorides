import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import EditCustomerForm from "@/app/components/dashboard/forms/editcustomer";
import { getCustomerById } from "@/lib/actions";


export default async function ViewCustomer(props) {
    const params = await props.params;
    const { _id } = params;
    const customer = await getCustomerById(_id)

    return (
		<div className="w-full h-full flex flex-col gap-4">
			<BreadCrumb title={"Customer Details"} />
			<EditCustomerForm customer={customer} />
		</div>
	);
}
