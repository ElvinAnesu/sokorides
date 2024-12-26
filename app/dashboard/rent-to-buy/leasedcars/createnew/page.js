"use client"
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import { addClientDetails } from "@/lib/server-actions/lease";
import { useActionState } from "react";




export default function LeaseCar() {  

	const [state, formAction, pending] = useActionState(
		addClientDetails, 
		undefined)  
	
	

	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Lease Vehicle"} />
			<form
				className="bg-white rounded shadow grid grid-cols-1 md:grid-cols-3 p-4 gap-4"
				action={formAction}
			>
				<div className="md:col-span-3">
					<h1 className="font-semibold text-sm">Customer Details</h1>
				</div>
				<div className="w-full">
					<h5 className="text-sm">First name(s)</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="clientName"
						required
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Surname</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="clientSurname"
						required
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Id Number</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="clientIdNo"
						required
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Email</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="clientEmail"
						required
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Phone Number</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="clientPhonenumber"
						required
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Physical Address</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="clientAddress"
						required
					/>
				</div>
				<div className="md:col-span-3">
					<h1 className="font-semibold text-sm">Lease Details</h1>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Car</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="Car"
						name="leasedCar"
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Total Price</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="Price"
						name="totalPrice"
						type="number"
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Monthly Payments</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						type="number"
						name="monthlyPayments"
					/>
				</div>

				<div className="w-full">
					<h5 className="text-sm">Down Payment</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="Payment"
						name="downPayment"
						type="numbers"
					/>
				</div>
				<div className="hidden md:block md:col-span-2"></div>
			
				<button className="bg-purple-900 rounded text-white p-2">
					{pending ? "loading" : "Next"}
				</button>
			</form>
		</div>
	);
}

