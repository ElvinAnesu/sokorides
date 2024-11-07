import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import CreateProductForm from "@/app/components/dashboard/forms/createproduct";

export default function AddNew() {
	return (
		<div className="h-full w-full flex flex-col gap-4">
			<BreadCrumb title={"Add New Product"} />
			<CreateProductForm />
		</div>
	);
}
