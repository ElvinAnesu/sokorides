// app/components/clientarea/forms/registerform.js
"use client";
import { registerCustomer } from "@/lib/server-actions/customer"; // Assuming you have a register function
import { useActionState } from "react";

export default function RegisterForm() {
	const [state, formAction] = useActionState(registerCustomer, null);

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			<div className="flex flex-col gap-8 bg-white rounded shadow-lg p-10">
				<h1 className="font-semibold text-2xl text-center">Register</h1>
				<p className=" text-center">Enter your registered phone number</p>
				<form className="flex flex-col gap-4" action={formAction}>
					<input
						className="border rounded h-12 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
						placeholder="Phone Number"
						type="tel"
						name="phoneNumber"
					/>
					{state?.error && (
						<p className="text-red-500 text-sm">{state.error}</p>
					)}
					<button
						className="bg-purple-900 rounded p-3 flex items-center justify-center text-white hover:bg-purple-700 transition"
						type="submit"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
