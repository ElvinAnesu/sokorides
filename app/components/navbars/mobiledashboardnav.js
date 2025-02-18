import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	Cross1Icon,
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

export default function MobileDashboardNav({ onClose }) {
	const router = useRouter();
	const pathname = usePathname();
	const logout = () => {
		localStorage.removeItem("username");
		localStorage.removeItem("token");
		router.push("/auth/login");
	};
	return (
		<div className="absolute h-full top-0 left-0 bg-purple-900 flex flex-col gap-4 p-4 z-10 w-3/4">
			<div className="flex items-center justify-end">
				<button
					className="border rounded border-white text-white p-2"
					onClick={onClose}
				>
					<Cross1Icon />
				</button>
			</div>
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
						pathname === "/dashboard/rent-to-buy"
							? "bg-white text-black"
							: "text-white"
					}`}
				>
					<Link
						href="/dashboard/rent-to-buy"
						className="flex gap-2 items-center"
					>
						<ListBulletIcon /> Rent to Buy
					</Link>
				</li>
				<li
					className={`p-2 rounded hover:bg-white hover:text-black ${
						pathname === "/dashboard/invoices"
							? "bg-white text-black"
							: "text-white "
					}`}
				>
					<Link href="/dashboard/invoices" className="flex gap-2 items-center">
						<ReaderIcon /> Invoices
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
						<ArchiveIcon /> Batches
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
