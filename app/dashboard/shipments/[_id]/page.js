import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import EditShipmentForm from "@/app/components/dashboard/forms/editshipment";
import SendNotificationForm from "@/app/components/dashboard/forms/sendshipmentupdateform";
import { getShipmentById, getAllCustomers } from "@/lib/actions";

export default async function ShipmentDetails({ params }) {
	const { _id } = params;
	const [shipment, customers] = await Promise.all([
		getShipmentById(_id),
		getAllCustomers(),
	]);

	return (
		<div className="w-full h-full flex flex-col gap-4">
			<BreadCrumb title={"Shipment Details"} />
			<EditShipmentForm shipment={shipment} customers={customers} />
		</div>
	);
}
