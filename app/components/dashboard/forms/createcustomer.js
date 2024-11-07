"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	UserCircleIcon,
	LockClosedIcon,
    PhoneIcon,
    HomeModernIcon
} from "@heroicons/react/24/outline";
import { createCustomer } from "@/lib/actions";

export default function CreateCustomerForm() {
	const [firstname, setFirstname] = useState();
	const [surname, setSurname] = useState();
	const [phonenumber, setPhonenumber] = useState();
	const [address, setAddress] = useState();
	
	const addCustomer = async (e) => {
		e.preventDefault();
		await createCustomer(firstname, surname, phonenumber,address);
	};

	return (
		<div className="w-full flex flex-col">
			<div className="flex w-full bg-white rounded-lg p-2">
				<form
					className="flex flex-col w-full gap-4 bg-gray-200 rounded p-4"
					onSubmit={(e) => addCustomer(e)}
				>
					<div>
						<h1 className="text-xs font-semibold">First Name</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="firstname"
								onChange={(e) => setFirstname(e.target.value)}
							/>
							<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Surname</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="surname"
								onChange={(e) => setSurname(e.target.value)}
							/>
							<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Phone Number</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="phone number"
								type="number"
								onChange={(e) => setPhonenumber(e.target.value)}
							/>
							<PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Address</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								placeholder="address"
								onChange={(e) => setAddress(e.target.value)}
							/>
							<HomeModernIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<button className="bg-purple-900 rounded p-2 text-white max-w-32">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
