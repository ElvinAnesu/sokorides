import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import CreateUserForm from "@/app/components/dashboard/forms/ceateuser";

export default function CreateNew() {
	return (
		<div className="flex flex-col w-full h-full gap-4 p-4">
			<BreadCrumb title={"Create New User"} />
			<CreateUserForm />
		</div>
	);
}
