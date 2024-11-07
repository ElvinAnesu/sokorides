import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import EditUserForm from "@/app/components/dashboard/forms/edituser";

import { getUserById } from "@/lib/actions";

export default async function CreateNew({ params }) { 
	const { _id } = params
	const user  = await getUserById(_id)
	return (
		<div className="flex flex-col w-full h-full gap-4 p-4">
			<BreadCrumb title={"Edit User"} />
			<EditUserForm user={user} />
		</div>
	);
}
