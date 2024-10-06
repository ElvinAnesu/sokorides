"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentDetails({ params }) {
	const { _id } = params;
	const router = useRouter();
	const [fullname, setFullname] = useState();
	const [amount, setAmount] = useState();
	const [date, setDate] = useState();
	const [description, setDescription] = useState();
	const [paymentMethod, setPaymentMethod] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [editRecord, setEditRecord] = useState(false);

    const getPaymentDetails = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/payments/${_id}`, {
            method: "GET",
            headers:{"Content-Type":"application/json"}
        })
        const data = await response.json()

        if (data.success) {
            setFullname(data.payment.fullname)
            setAmount(data.payment.amount);
            setDate(data.payment.date);
            setDescription(data.payment.description);
            setPaymentMethod(data.payment.paymentMethod);
            setIsLoading(false)
        } else {
            setIsLoading(false)
            alert(data.message)
        }
    }

	const editDetails = () => {
		const role = localStorage.getItem("role");
		if (role === "owner") {
			setEditRecord(!editRecord);
		} else {
			alert("No rights to perform this action");
		}
	};

	const updatePayment = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch(`/api/payments/${_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				fullname,
				amount,
				paymentMethod,
				date,
				description,
			}),
		});
		const data = await response.json();
		if (data.success) {
			alert(data.message);
			setIsLoading(false);
		} else {
			alert(data.message);
			setIsLoading(false);
		}
	};

    useState(() => {
        getPaymentDetails()
    }, [])
    
	return (
		<div className="flex flex-col w-full h-full gap-4 p-4">
			<div className="flex   w-full items-center gap-2">
				<button
					className="border border-purple-900 text-purple-900 rounded-full flex items-center justify-centr p-1"
					onClick={() => router.back()}
				>
					<ArrowLeftIcon className="h-4 w-4" />
				</button>
				<div className="w-full flex items-center justify-between">
                    <h1 className="text-sm font-bold">Payment Details</h1>
                    <button className="rounded text-xs py-2 bg-purple-900 text-white px-4"
                        onClick={editDetails}>
                        {editRecord? "Cancel":"Edit"}
                    </button>
				</div>
			</div>

			{isLoading ? (
				<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
					<div className="flex flex-col items-center justify-center  w-full h-full">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
					</div>
				</div>
			) : (
				<form
					className="flex flex-col md:grid md:grid-cols-3 gap-4"
					onSubmit={(e) => updatePayment(e)}
				>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Full Name</h1>
						<input
							className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
							placeholder="full name"
							onChange={(e) => setFullname(e.target.value)}
							value={fullname}
							disabled={!editRecord}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Amount</h1>
						<input
							className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
							placeholder="amount"
							onChange={(e) => setAmount(e.target.value)}
							value={amount}
							disabled={!editRecord}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Payment Method</h1>
						<input
							className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
							placeholder="payment method"
							onChange={(e) => setPaymentMethod(e.target.value)}
							value={paymentMethod}
							disabled={!editRecord}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Date</h1>
						<input
							className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
							placeholder="date"
							type="date"
							onChange={(e) => setDate(e.target.value)}
							value={date}
							disabled={!editRecord}
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-xs font-semibold">Description</h1>
						<input
							className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
							placeholder="description"
							onChange={(e) => setDescription(e.target.value)}
							value={description}
							disabled={!editRecord}
						/>
					</div>
					<div></div>
					{editRecord && (
						<button className="bg-purple-900 p-2 rounded text-white">
							Submit
						</button>
					)}
				</form>
			)}
		</div>
	);
}
