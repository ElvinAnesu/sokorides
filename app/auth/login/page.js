"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
	const router = useRouter();
	const [phonenumber, setPhonenumber] = useState();
	const [password, setPassword] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const login = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch("/api/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				phonenumber,
				password,
			}),
		});
		const data = await response.json();
		if (data.success) {
			setIsLoading(false);
			localStorage.setItem("username", data.user.firstname);
			localStorage.setItem("role", data.user.role);
			localStorage.setItem("token", data.token);
			router.push("/dashboard");
		} else {
			setIsLoading(false);
			alert(data.message);
		}
	};

	return (
		<div className="relative w-full h-screen flex items-center justify-center bg-gray-100 px-4">
			<form
				className="flex flex-col items-center justify-center gap-4 bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
				onSubmit={(e) => login(e)}
			>
				<h1 className="font-bold text-2xl text-gray-800">SOKO CARS ADMIN PANEL</h1>
				<input
					className="border border-gray-300 rounded-lg w-full bg-gray-50 p-3 text-gray-700 text-base focus:outline-none focus:border-purple-500"
					placeholder="Phone number"
					onChange={(e) => setPhonenumber(e.target.value)}
					required
					disabled={isLoading}
				/>
				<input
					className="border border-gray-300 rounded-lg w-full bg-gray-50 p-3 text-gray-700 text-base focus:outline-none focus:border-purple-500"
					placeholder="Password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					required
					disabled={isLoading}
				/>
				<button
					className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-200"
					type="submit"
				>
					{isLoading ? (
						<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
					) : (
						"Login"
					)}
				</button>
			</form>
		</div>

	);
}
