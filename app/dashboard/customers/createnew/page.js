"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function CreateNew() {
	const router = useRouter();
	const [surname, setSurname] = useState();
	const [firstname, setFirstname] = useState();
	const [phonenumber, setPhonenumber] = useState();
	const [email, setEmail] = useState();
	const [address, setAddress] = useState();

	const createCustomer = async (e) => {
		e.preventDefault();
		const response = await fetch("/api/customers", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				surname,
				firstname,
				phonenumber,
				email,
				address,
			}),
		});

		const data = await response.json();

		if (data.success) {
			alert(data.message);
		} else {
			alert(data.message);
		}
	};

	return (
		<div className="w-full h-full flex flex-col gap-4 p-4 ">
			<div className="flex gap-2 items-center">
				<button
					className="border border-purple-900 text-purple-900 rounded-full p-1"
					onClick={() => router.back()}
				>
					<ArrowLeftIcon className="w-5 h-5" />
				</button>
				<h1 className="text-sm font-semibold">Create New Customer</h1>
			</div>
			<form
				className="flex flex-col md:grid md:grid-cols-3 bg-gray-200 rounded  p-4"
				onSubmit={(e) => createCustomer(e)}
			>
				<div className="flex flex-col p-2">
					<h1 className="text-xs ">First Name</h1>
					<input
						className="border border-black  rounded bg-transparent w-full p-2 test-sm"
						placeholder="first name"
						onChange={(e) => setFirstname(e.target.value)}
						required
					/>
				</div>
				<div className="flex flex-col p-2">
					<h1 className="text-xs ">Surname</h1>
					<input
						className="border border-black  rounded bg-transparent w-full p-2 test-sm"
						placeholder="surname"
						onChange={(e) => setSurname(e.target.value)}
						required
					/>
				</div>
				<div className="flex flex-col p-2">
					<h1 className="text-xs ">Phone Number</h1>
					<input
						className="border border-black  rounded bg-transparent w-full p-2 test-sm"
						placeholder="phone number"
						onChange={(e) => setPhonenumber(e.target.value)}
						required
					/>
				</div>
				<div className="flex flex-col p-2">
					<h1 className="text-xs ">Email</h1>
					<input
						className="border border-black  rounded bg-transparent w-full p-2 test-sm"
						placeholder="phone number"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex flex-col p-2">
					<h1 className="text-xs ">Address</h1>
					<input
						className="border border-black rounded bg-transparent w-full p-2 test-sm"
						placeholder="address"
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</div>
				<div></div>
				<div className="flex flex-col p-2">
					<button className="w-full bg-purple-900 text-white rounded p-2">
						Create
					</button>
				</div>
			</form>
		</div>
	);
}
