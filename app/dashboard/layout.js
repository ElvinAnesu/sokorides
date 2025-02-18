"use client";
import DashBoardNav from "../components/navbars/dashboardnav";
import { PersonIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileDashboardNav from "../components/navbars/mobiledashboardnav";


export default function DashBoardLayout({ children }) {
	const router = useRouter();
	const [username, setUsername] = useState();
	const [showMobileNav, setShowMobileNav] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/auth/login");
			console.log("No token found");
		} else {
			console.log("Token found");
			console.log(token);
			const _username = localStorage.getItem("username");
			setUsername(_username);
		}
	}, []);

	return (
		<div className="h-screen w-full flex flex-col md:grid md:grid-cols-5 p-4 gap-4 bg-gray-200">
			<div className="hidden md:block">
				<DashBoardNav />
			</div>
			<div className="max-h-full md:col-span-4 flex flex-col overflow-y-auto overflow-hidden">
				<div className="w-full flex items-center justify-between md:justify-end gap-2  h-16">
					<button
						className="md:hidden border border-purple-900 text-purple-900 rounded p-2"
						onClick={() => setShowMobileNav(true)}
					>
						<HamburgerMenuIcon />
					</button>
					<div className="flex gap-2 items-center mb-8">
						<h1 className="text-black font-bold text-sm">{username}</h1>
						<div className="bg-purple-900 text-white h-8 w-8 rounded-full flex items-center justify-center">
							<PersonIcon className="h-6 w-6" />
						</div>
					</div>
				</div>
				<div className="max-h-full w-full flex-grow ">{children}</div>
			</div>
			{showMobileNav && (
				<MobileDashboardNav onClose={() => setShowMobileNav(false)} />
			)}
		</div>
	);
}
