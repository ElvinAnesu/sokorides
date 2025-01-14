"use client";
import { DeleteBtn } from "../common/buttons/buttons";
import Link from "next/link";
import { updateClientDetails, deleteLeaseDocument } from "@/lib/server-actions/lease";
import { useActionState } from "react";
import { ArrowRightIcon, TrashIcon } from "@radix-ui/react-icons";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function LeaseDetailsForm({ lease, _id }) { 

    const [state, formAction, pending] = useActionState(updateClientDetails, undefined)
	const [edit, setEdit] = useState(true)

	const deleteDoc = async (doc) =>
		await deleteLeaseDocument(lease._id, doc);
	return (
		<form
			className="bg-white rounded shadow grid grid-cols-1 md:grid-cols-4 p-4 gap-4"
			action={formAction}
		>
			<div className="flex md:col-span-4 items-center justify-end gap-2">
				<button
					className="rounded-md border p-2 hover:bg-gray-100"
					type="button"
					onClick={() => setEdit(!edit)}
				>
					<span className="sr-only">Edit</span>
					<PencilIcon className="w-4" />
				</button>
				<DeleteBtn item={"lease"} _id={lease._id} />
			</div>
			<div className="flex md:col-span-4 items-center justify-center">
				{state?.messages?.success && (
					<p className="text-center text-green-600 text-sm">
						{state?.messages?.success}
					</p>
				)}
			</div>
			<div className="md:col-span-4">
				<h1 className="font-semibold text-sm">Customer Details</h1>
			</div>
			<div className="w-full">
				<h5 className="text-sm">First name(s)</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="first name"
					name="clientName"
					defaultValue={lease?.clientName}
					disabled={edit}
				/>
			</div>
			<div className="w-full">
				<h5 className="text-sm">Surname</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="Surname"
					name="clientSurname"
					defaultValue={lease?.clientSurname}
					disabled={edit}
				/>
			</div>
			<div className="w-full">
				<h5 className="text-sm">Id Number</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="Id Number"
					name="clientIdNo"
					defaultValue={lease?.clientIdNo}
					disabled={edit}
				/>
			</div>
			<div className="w-full">
				<h5 className="text-sm">Email</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="email"
					name="clientEmail"
					defaultValue={lease?.clientEmail}
					disabled={edit}
				/>
			</div>
			<div className="w-full">
				<h5 className="text-sm">Phone Number</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="Phone number"
					name="clientPhonenumber"
					defaultValue={lease?.clientPhonenumber}
					disabled={edit}
				/>
			</div>
			<div className="w-full">
				<h5 className="text-sm">Physical Address</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="Address"
					name="clientAddress"
					defaultValue={lease?.clientAddress}
					disabled={edit}
				/>
			</div>
			<input
				className="hidden"
				placeholder="_id"
				name="_id"
				defaultValue={_id}
				disabled={edit}
			/>
			<div className="md:col-span-4">
				<h1 className="font-semibold text-sm">Lease Details</h1>
			</div>
			<div className="w-full">
				<h5 className="text-sm">Car</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="car"
					name="leasedCar"
					defaultValue={lease?.leasedCar}
					disabled={edit}
				/>
			</div>
			<div className="w-full">
				<h5 className="text-sm">Date of Issue</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					type="date"
					name="dateOfIssue"
					defaultValue={lease?.dateOfIssue}
					disabled={edit}
				/>
			</div>
			<div className="w-full">
				<h5 className="text-sm">Monthly Instalments</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="first name"
					name="monthlyPayments"
					defaultValue={lease?.monthlyPayments}
					disabled={edit}
				/>
				{state?.errors?.monthlyPayments && (
					<p className="text-center text-green-600 text-sm">
						{state?.errors?.monthlyPayments}
					</p>
				)}
			</div>
			<div className="w-full">
				<h5 className="text-sm">Total Price</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="Current Payments"
					name="totalPrice"
					defaultValue={lease?.totalPrice || ""}
					disabled={edit}
				/>
			</div>
			<div className="w-full">
				<h5 className="text-sm">Current Payments</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="Current Payments"
					name="currentPayments"
					defaultValue={lease?.downPayment || ""}
					disabled
				/>
			</div>
			<div className="w-full">
				<h5 className="text-sm">Outsanding Balance</h5>
				<input
					className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
					placeholder="Balance"
					name="outStandingBalance"
					defaultValue={lease?.totalPrice - lease?.downPayment || ""}
					disabled
				/>
			</div>
			<div className="md:col-span-4">
				{!edit && (
					<button
						className="rounded bg-purple-900 p-2 text-white px-8"
						type="submit"
					>
						{pending ? "loading..." : "Update Details"}
					</button>
				)}
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
							<h1>{doc.type}</h1>
							<div className="flex items-center gap-16">
								<button
									className="flex gap-2 items-center"
									type="button"
									onClick={(e) => {
										deleteDoc(doc);
									}}
								>
									delete
									<TrashIcon />
								</button>
								<Link href={doc} className="flex gap-2 items-center ">
									View
									<ArrowRightIcon />
								</Link>
							</div>
						</div>
					))}
				<Link
					href={`/dashboard/rent-to-buy/leasedcars/createnew/${_id}/documents`}
					className="text-x text-purple-900 flex items-center "
				>
					<PlusCircleIcon width={25} height={25} />
					new document
				</Link>
			</div>
			<div className="w-full flex flex col gap-4">
				<Link
					href={`/dashboard/rent-to-buy/${_id}/payments`}
					className="bg-purple-900 rounded p-2 text-white "
				>
					Update Payments
				</Link>
			</div>
		</form>
	);
}
