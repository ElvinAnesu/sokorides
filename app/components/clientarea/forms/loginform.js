"use client";
import { loginCustomer } from "@/lib/server-actions/customer";
import { useActionState } from "react";
import Link from "next/link";

export default function LoginForm() {
    const [state, formAction] = useActionState(loginCustomer, null);

    return (
			<div className="flex flex-col gap-8 bg-white rounded shadow-lg p-10">
				<h1 className="font-semibold text-2xl text-center">Login</h1>
				<form className="flex flex-col gap-4" action={formAction}>
					<input
						className="border rounded h-12 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
						placeholder="Phone Number"
						type="tel"
						name="phoneNumber"
					/>
					<input
						className="border rounded h-12 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
						placeholder="Password"
						type="password"
						name="password"
					/>
					{state?.error && (
						<p className="text-red-500 text-sm">{state.error}</p>
					)}
					<button
						className="bg-purple-900 rounded p-3 flex items-center justify-center text-white hover:bg-purple-700 transition"
						type="submit"
					>
						Login
					</button>
				</form>
				<p className="text-center">
					First time coming here?{" "}
					<Link href="/auth/register" className="text-purple-600">
						Register here
					</Link>
				</p>
			</div>
		);
}