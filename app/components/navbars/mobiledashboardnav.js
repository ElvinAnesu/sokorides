import Link from "next/link"
import { Cross1Icon } from "@radix-ui/react-icons"

export default function MobileDashboardNav({onClose}){
    return (
			<div className="absolute h-full top-0 left-0 bg-gray-300 flex flex-col gap-4 p-4 z-10 w-3/4">
				<div className="flex items-center justify-end">
					<button
						className="border rounded border-gray-900 p-2"
						onClick={onClose}
					>
						<Cross1Icon />
					</button>
				</div>
				<ul className="flex flex-col gap-4 text-sm">
					<li>
						<Link href="/dashboard">Dashboard</Link>
					</li>
					<li>
						<Link href="/dashboard/cars">Cars in stock</Link>
					</li>
					<li>
						<Link href="/dashboard/payments">Payments</Link>
					</li>
					<li>
						<Link href="/dashboard/purchases">Purchases</Link>
					</li>
					<li>
						<Link href="/dashboard/shipments">Shipments</Link>
					</li>
					<li>
						<Link href="/dashboard/customers">Customers</Link>
					</li>
					<li>
						<Link href="/dashboard/users">Users</Link>
					</li>
					<li>
						<button onClick={() => router.push("/auth/login")}>Logout</button>
					</li>
				</ul>
			</div>
		);
}