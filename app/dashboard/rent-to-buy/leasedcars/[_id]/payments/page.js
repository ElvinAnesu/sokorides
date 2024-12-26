"use client";
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import { updateDownPayment } from "@/lib/server-actions/lease";
import { use, useState } from "react";

export default function LeasedCarDetails({ params }) {
	const { _id } = use(params);
    const [amount, setAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const _updatePayments = async () => {
        setIsLoading(true)
        await updateDownPayment(_id, amount);
        setIsLoading(false)
    }


	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Update Payments"} />
			<div className="bg-white rounded shadow grid grid-cols-1 md:grid-cols-4 p-4 gap-4">
				<div className="w-full">
					<h5 className="text-sm">Date</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="date"
						type="date"
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Surname</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="amount"
						name="amount"
                        type="number"
                        onChange={(e)=> setAmount(e.target.value)}
					/>
                </div>
                <div className="hidden md:block md:col-span-2"></div>
                <button className="bg-purple-900 rounded text-white p-2"
                     onClick={_updatePayments}>
					{isLoading ? "loading" : "Next"}
				</button>
			</div>
		</div>
	);
}
