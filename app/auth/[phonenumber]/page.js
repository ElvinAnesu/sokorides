// app/auth/set-password/[phoneNumber].js
"use client";
import { use, useState } from "react";
import { setPassword } from "@/lib/server-actions/customer"; // Assuming you have a setPassword function
import { useActionState } from "react";

export default function SetPasswordPage({ params }) {
 
    const { phonenumber } = use(params);
	const [password, setPasswordState] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction] = useActionState(setPassword, null);

	const handleSubmit = async () => {

		if (password === confirmPassword) {
			 formAction({ phonenumber, password },);
		} else {
			alert("Passwords do not match");
		}
	};

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			<div className="flex flex-col gap-8 bg-white rounded shadow-lg p-10">
				<h1 className="font-semibold text-2xl text-center">Set Password</h1>
				<form className="flex flex-col gap-4" action={handleSubmit}>
					<div>
						<input
							className="border rounded h-12 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
							placeholder="Password"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPasswordState(e.target.value)}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="text-sm text-purple-600"
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
					<div>
						<input
							className="border rounded h-12 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
							placeholder="Confirm Password"
							type={showPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="text-sm text-purple-600"
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>
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
