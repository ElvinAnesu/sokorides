"use client";
import { HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import MobileNav from "../navbars/mobilenav";
import MobileDashboardNav from "../navbars/mobiledashboardnav";

export default function MainHeader() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState();
	const [showMobileNav, setShowMobileNav] = useState(false);

	const pathname = usePathname();
	const isDashboard = pathname.startsWith("/dashboard");

	return (
		<div className="flex w-full h-100 p-2 items-center justify-between bg-purple-900">
			<div className={`${isDashboard && "md:hidden"}`}>
				<button
					className="border border-white text-white rounded p-2"
					onClick={() => setShowMobileNav(true)}
				>
					<HamburgerMenuIcon />
				</button>
			</div>
			{!isDashboard && (
				<div className="md:w-full md:flex gap-4 px-4">
					<button onClick={() => router.push("/")}>
						<h1 className="font-semibold text-2xl text-white">SOKOCARS</h1>
					</button>
				</div>
			)}
			{!isDashboard && (
				<div className="relative w-full px-4 hidden md:block">
					<input
						className="border border-white rounded-full bg-transparent p-2 text-sm w-full text-white"
						placeholder="search for cars"
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button
						className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white"
						onClick={() => router.push(`/store/products/${searchQuery}`)} // Replace with your search logic
					>
						<MagnifyingGlassIcon className="w-6 h-6" />
					</button>
				</div>
			)}
			{!isDashboard && (
				<div className="w-full flex items-center justify-end px-4 gap-4">
					<button
						className="flex border rounded-full py-2 px-4 border-white  text-sm text-white"
						onClick={() => router.push("tel:+263774050385")}
					>
						call
					</button>
				</div>
			)}

			{showMobileNav === true ? (
				isDashboard ? (
					<MobileDashboardNav onClose={() => setShowMobileNav(false)} />
				) : (
					<MobileNav onClose={() => setShowMobileNav(false)} />
				)
			) : (
				<div>
						
				</div>
			)}
		</div>
	);
}
