"use server"
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import { getLeaseById } from "@/lib/server-actions/lease";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function LeasedCarDetails({params}) { 

	const { _id } = await params;
	const lease = await getLeaseById(_id)

	 
	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Leased Vehicle"} />
			<form className="bg-white rounded shadow grid grid-cols-1 md:grid-cols-4 p-4 gap-4">
				<div className="md:col-span-4">
					<h1 className="font-semibold text-sm">Customer Details</h1>
				</div>
				<div className="w-full">
					<h5 className="text-sm">First name(s)</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						defaultValue={lease?.clientName}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Surname</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						defaultValue={lease?.clientSurname}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Id Number</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						defaultValue={lease?.clientIdNo}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Email</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						defaultValue={lease?.clientEmail}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Phone Number</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						defaultValue={lease?.clientPhonenumber}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Physical Address</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						defaultValue={lease?.clientAddress}
						disabled
					/>
				</div>
				<div className="md:col-span-4">
					<h1 className="font-semibold text-sm">Lease Details</h1>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Car</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						defaultValue={lease?.leasedCar}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Date of Issue</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"3 Jan 2024"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Monthly Instalments</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						defaultValue={lease?.monthlyPayments}
						disabled
					/>
				</div>

				<div className="w-full">
					<h5 className="text-sm">Current Payments</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						defaultValue={lease?.downPayment}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Balance Due</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"USD500"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Overdue payments</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"USD500"}
						disabled
					/>
				</div>
				<div className="md:col-span-4">
					<h1 className="font-semibold text-sm">Supporting Documents</h1>
				</div>
				<div className="w-full flex flex-col gap-4 md:col-span-4">
					{lease?.documents?.length > 0 &&
						lease.documents.map((doc, index) => (
							<div
								key={index}
								className="w-full flex items-center justify-between border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
							>
								<h1>Document</h1>
								<Link href={doc} className="flex gap-2 items-center ">
									View
									<ArrowRightIcon />
								</Link>
							</div>
						))}
				</div>
				<div className="w-full flex flex col gap-4">
					<Link href={`/dashboard/rent-to-buy/leasedcars/${_id}/payments`} className="bg-purple-900 rounded p-2 text-white ">
						Update Payments
					</Link>
				</div>
			</form>
		</div>
	);
}
