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
		<div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/loginbg.png')] bg-cover bg-center px-8">
			<div className="absolute top-0 w-full h-full bg-black opacity-70 flex flex-col items-center justify-center"></div>
			<form
				className="z-10 flex flex-col items-center justify-center gap-2 bg-black p-4 rounded shadow w-full md:w-1/4 relative opacity-80 "
				onSubmit={(e) => login(e)}
			>
				<h1 className="font-semibold text-xl text-white ">SOKO CARS ADMIN PANEL</h1>
				<input
					className="border border-gray-900 rounded w-full bg-transparent p-2 text-sm text-white"
					placeholder="phone number"
					onChange={(e) => setPhonenumber(e.target.value)}
					required
					disabled={isLoading}
				/>
				<input
					className="border border-gray-900  rounded w-full bg-transparent p-2 text-sm text-white"
					placeholder="password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					required
					disabled={isLoading}
				/>
				<button
					className="w-full bg-purple-900 text-white p-2 rounded text-sm flex items-center justify-center"
					type="submit"
				>
					{isLoading ? (
						<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-300"></div>
					) : (
						"Login"
					)}
				</button>
			</form>
		</div>
	);
}
