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
	ArchiveIcon
} from "@radix-ui/react-icons";

export default function DashBoardNav() {
	const router = useRouter();
	const pathname = usePathname();
	const logout = () => {
		localStorage.removeItem("username");
		router.push("/auth/login");
	};
	return (
		<div className="flex flex-col w-full h-full p-4 shadow rounded bg-purple-900">
			<ul className="flex flex-col gap-4 text-sm">
				<li
					className={`p-2  rounded hover:bg-white hover:text-black ${
						pathname === "/dashboard" ? "bg-white text-black" : "text-white"
					}`}
				>
					<Link href="/dashboard" className="flex gap-2 items-center">
						<DashboardIcon /> Dashboard
					</Link>
				</li>
				<li
					className={`p-2 rounded hover:bg-white hover:text-black ${
						pathname === "/dashboard/cars"
							? "bg-white text-black"
							: "text-white"
					}`}
				>
					<Link href="/dashboard/cars" className="flex gap-2 items-center">
						<ListBulletIcon /> Cars in stock
					</Link>
				</li>
				<li
					className={`p-2 rounded hover:bg-white hover:text-black ${
						pathname === "/dashboard/payments"
							? "bg-white text-black"
							: "text-white "
					}`}
				>
					<Link href="/dashboard/payments" className="flex gap-2 items-center">
						<IdCardIcon /> Payments
					</Link>
				</li>
				<li
					className={`p-2 rounded hover:bg-white hover:text-black  ${
						pathname === "/dashboard/purchases"
							? "bg-white text-black"
							: "text-white"
					}`}
				>
					<Link href="/dashboard/purchases" className="flex gap-2 items-center">
						<CardStackIcon /> Purchases
					</Link>
				</li>
				<li
					className={`p-2 rounded hover:bg-white hover:text-black  ${
						pathname === "/dashboard/batches"
							? "bg-white text-black"
							: "text-white"
					}`}
				>
					<Link href="/dashboard/batches" className="flex gap-2 items-center">
						<ArchiveIcon/> Batches
					</Link>
				</li>
				<li
					className={`p-2 rounded hover:bg-white hover:text-black  ${
						pathname === "/dashboard/shipments"
							? "bg-white text-black"
							: "text-white"
					}`}
				>
					<Link href="/dashboard/shipments" className="flex gap-2 items-center">
						<RocketIcon /> Shipments
					</Link>
				</li>
				<li
					className={`p-2 rounded hover:bg-white hover:text-black  ${
						pathname === "/dashboard/customers"
							? "bg-white text-black"
							: "text-white"
					}`}
				>
					<Link href="/dashboard/customers" className="flex gap-2 items-center">
						<PersonIcon /> Customers
					</Link>
				</li>
				<li
					className={`p-2 rounded hover:bg-white hover:text-black  ${
						pathname === "/dashboard/users"
							? "bg-white text-black"
							: "text-white"
					}`}
				>
					<Link href="/dashboard/users" className="flex gap-2 items-center">
						<AvatarIcon /> Users
					</Link>
				</li>
				<li
					className={`p-2 rounded hover:bg-white hover:text-black text-white`}
				>
					<button onClick={logout} className="flex gap-2 items-center">
						<ExitIcon /> Logout
					</button>
				</li>
			</ul>
		</div>
	);
}
