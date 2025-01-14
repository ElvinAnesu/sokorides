"use client"
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import { addClientDetails } from "@/lib/server-actions/lease";
import { useActionState, useState } from "react";


export default function LeaseCar() {  

	const [firstName, setFirstName] = useState()
	const [surname, setSurname] = useState()
	const [idNumber, setIdNumber] = useState()
	const [email, setEmail] = useState()
	const [phoneNumber, setPhoneNumber] = useState()
	const [address, setAddress] = useState()
	const [car, setCar] = useState() 
	const [totalPice, setTotalPrice] = useState()
	const [monthlyPayments, setMonthlyPayments] = useState()
	const [downPayment, setDownpayment] = useState() 
	const [dateOfIssue, setDateOfIssue]= useState()
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
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="first name"
						name="clientName"
						defaultValue={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Surname</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="Surname"
						name="clientSurname"
						defaultValue={surname}
						onChange={(e) => setSurname(e.target.value)}
						required
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Id Number</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="Id Number"
						name="clientIdNo"
						defaultValue={idNumber}
						onChange={(e) => setIdNumber(e.target.value)}
						required
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Email</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="email"
						name="clientEmail"
						type="email"
						defaultValue={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Phone Number</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="Phone number"
						name="clientPhonenumber"
						defaultValue={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						required
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Physical Address</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="Address"
						name="clientAddress"
						defaultValue={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</div>
				<div className="md:col-span-3">
					<h1 className="font-semibold text-sm">Lease Details</h1>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Car</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="Car"
						defaultValue={car}
						onChange={(e) => setCar(e.target.value)}
						name="leasedCar"
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Date of Issue</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						type="date"
						defaultValue={dateOfIssue}
						onChange={(e) => setDateOfIssue(e.target.value)}
						name="dateOfIssue"
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Total Price</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="Price"
						name="totalPrice"
						defaultValue={totalPice}
						onChange={(e) => setTotalPrice(e.target.value)}
						type="number"
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Monthly Payments</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						type="number"
						name="monthlyPayments"
						defaultValue={monthlyPayments}
						onChange={(e) => setMonthlyPayments(e.target.value)}
						placeholder="instalments"
					/>
					{state?.errors.monthlyPayments && (
						<p className="text-xs text-red-600">
							{state?.errors.monthlyPayments}
						</p>
					)}
				</div>
				<div className="w-full">
					<h5 className="text-sm">Down Payment</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="Payment"
						name="downPayment"
						defaultValue={downPayment}
						onChange={(e) => setDownpayment(e.target.value)}
						type="numbers"
					/>
					{state?.errors.downPayment && (
						<p className="text-xs text-red-600">{state?.errors.downPayment}</p>
					)}
				</div>
				<div className="hidden md:block"></div>
				<button className="bg-purple-900 rounded text-white p-2" type="submit">
					{pending ? "loading" : "Next"}
				</button>
			</form>
		</div>
	);
}


