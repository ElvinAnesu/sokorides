"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	DashboardIcon,
	ListBulletIcon,
	RocketIcon,
	PersonIcon,
	AvatarIcon,
	ExitIcon,
	CardStackIcon,
	IdCardIcon,
	ArchiveIcon,
	ReaderIcon
} from "@radix-ui/react-icons";

export default function DashBoardNav() {
	const router = useRouter();
	const pathname = usePathname();
	const logout = () => {
		localStorage.removeItem("username");
		localStorage.removeItem("token");
		router.push("/auth/login");
	};
	return (
		<div className="flex flex-col w-full h-full p-4 shadow rounded bg-gray-100">
			<ul className="flex flex-col gap-4 text-sm">
				<li
					className={`p-2 rounded transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800 ${
						pathname === "/dashboard"
							? "bg-purple-200 text-purple-900"
							: "text-gray-700"
					}`}
				>
					<Link href="/dashboard" className="flex gap-2 items-center">
						<DashboardIcon /> Dashboard
					</Link>
				</li>
				<li
					className={`p-2 rounded transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800 ${
						pathname === "/dashboard/rent-to-buy"
							? "bg-purple-200 text-purple-900"
							: "text-gray-700"
					}`}
				>
					<Link
						href="/dashboard/rent-to-buy"
						className="flex gap-2 items-center"
					>
						<ListBulletIcon />Rent to Buy
					</Link>
				</li>
				<li
					className={`p-2 rounded transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800 ${
						pathname === "/dashboard/invoices"
							? "bg-purple-200 text-purple-900"
							: "text-gray-700"
					}`}
				>
					<Link href="/dashboard/invoices" className="flex gap-2 items-center">
						<ReaderIcon /> Invoices
					</Link>
				</li>
				<li
					className={`p-2 rounded transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800 ${
						pathname === "/dashboard/payments"
							? "bg-purple-200 text-purple-900"
							: "text-gray-700"
					}`}
				>
					<Link href="/dashboard/payments" className="flex gap-2 items-center">
						<IdCardIcon /> Payments
					</Link>
				</li>
				<li
					className={`p-2 rounded transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800 ${
						pathname === "/dashboard/purchases"
							? "bg-purple-200 text-purple-900"
							: "text-gray-700"
					}`}
				>
					<Link href="/dashboard/purchases" className="flex gap-2 items-center">
						<CardStackIcon /> Purchases
					</Link>
				</li>
				<li
					className={`p-2 rounded transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800 ${
						pathname === "/dashboard/batches"
							? "bg-purple-200 text-purple-900"
							: "text-gray-700"
					}`}
				>
					<Link href="/dashboard/batches" className="flex gap-2 items-center">
						<ArchiveIcon /> Batches
					</Link>
				</li>
				<li
					className={`p-2 rounded transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800 ${
						pathname === "/dashboard/shipments"
							? "bg-purple-200 text-purple-900"
							: "text-gray-700"
					}`}
				>
					<Link href="/dashboard/shipments" className="flex gap-2 items-center">
						<RocketIcon /> Shipments
					</Link>
				</li>
				<li
					className={`p-2 rounded transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800 ${
						pathname === "/dashboard/customers"
							? "bg-purple-200 text-purple-900"
							: "text-gray-700"
					}`}
				>
					<Link href="/dashboard/customers" className="flex gap-2 items-center">
						<PersonIcon /> Customers
					</Link>
				</li>
				<li
					className={`p-2 rounded transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800 ${
						pathname === "/dashboard/users"
							? "bg-purple-200 text-purple-900"
							: "text-gray-700"
					}`}
				>
					<Link href="/dashboard/users" className="flex gap-2 items-center">
						<AvatarIcon /> Users
					</Link>
				</li>
				<li
					className={`p-2 rounded transition-colors duration-200 hover:bg-purple-100 hover:text-purple-800 text-gray-700`}
				>
					<button onClick={logout} className="flex gap-2 items-center">
						<ExitIcon /> Logout
					</button>
				</li>
			</ul>
		</div>
	);
}