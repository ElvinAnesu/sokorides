import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function PaymentsCard() {
	return (
		<div className="flex flex-col rounded bg-white shadow">
			<div className="w-full flex bg-purple-900 p-2 rounded-t flex items-center justify-between">
				<h1 className="text-white ">Payments</h1>
				<Link
					href={"/dashboard/rent-to-buy/payments"}
					className="text-white flex items-center gap-2"
				>
					View
					<ArrowRightIcon className="w-4 h-4" fontSize={24} />
				</Link>
			</div>
			<div className="p-4">
				<p className="text-center">No data to display</p>
			</div>
		</div>
	);
}
