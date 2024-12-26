"use server"
import HomeCard from "@/app/components/clientarea/cards/homecard";
import { getLeaseById } from "@/lib/server-actions/lease";



const notifications = {
	title: "Notifications",
	notifications: [
		
	],
}; 



export default async function Home({params}) {  
	const { _id } = await params;
	const lease = await getLeaseById(_id) 
	const userInfo = {
		title: "User Information",
		details: [
			{
				label: lease?.clientName + " " + lease?.clientSurname,
				url: "#",
			},
			{
				label: lease?.clientEmail,
				url: "#",
			},
			{
				label: lease?.clientPhonenumber,
				url: "#",
			},
		],
	}; 
	const purchasedVehicle = {
		title: "Purchased Vehilce(s)",
		vehicles: [
			{
				label: lease?.leasedCar,
				url:"#"
			},
		],
	}; 
	const payments = {
		title: "Payments",
		details: [
			{
				label: `Outstanding Payments : ${
					lease?.totalPrice - lease?.downPayment
				}`,
				url: "#",
			},
			{
				label: `Current Payments: ${lease?.downPayment}`,
				url: "#",
			},
			{
				label: `Total Price: ${lease?.totalPrice}`,
				url: "#",
			},
		],
	};

    return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
				<HomeCard title={userInfo.title} _list={userInfo.details} />
				<HomeCard
					title={purchasedVehicle.title}
					_list={purchasedVehicle.vehicles}
				/>
				<HomeCard title={payments.title} _list={payments.details} />
				<HomeCard
					title={notifications.title}
					_list={notifications.notifications}
				/>
			</div>
		);
}