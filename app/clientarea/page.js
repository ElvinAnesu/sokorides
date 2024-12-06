import { HomeIcon } from "@radix-ui/react-icons";
import HomeCard from "../components/clientarea/cards/homecard";

const purchasedVehicle = {
	title: "Purchased Vehilce(s)",
	vehicles: [
		{
			label: "Honda Vezel Hybrid",
			url: "/clientarea/purchases/_id"
		}
	]
}
const payments = {
	title: "Payments",
	details: [
		{
			label: "Outstanding Payments : $3,000",
			url: "#",
		},
		{
			label: "Current Payments: $4,500",
			url: "#",
		},
		{
			label: "Last Payment: $2000",
			url: "#",
		},
	],
};
const notifications = {
	title: "Notifications",
	notifications: [
		{
			label: "Monthly payment due",
			url: "#",
		},
		{
			label: "You have received one new invoice",
			url: "#",
		},
		{
			label: "Paymen sucessfully processed",
			url: "#",
		},
	],
}; 
const userInfo = {
	title: "User Information",
	details: [
		{
			label: "Name:Elvin Kakomo",
			url: "#",
		},
		{
			label: "Email:elviin@gmail.com",
			url: "#",
		},
		{
			label: "Phone: 0775953491",
			url: "#",
		},
	],
};


export default function Home() {
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