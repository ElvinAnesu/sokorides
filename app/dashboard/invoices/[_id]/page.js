"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";

export default function InvoiceDetails({ params }) {
	const { _id } = params;
	const router = useRouter();
	const [isLoading, setIsLoading] = useState();
	const [purchases, setPurchases] = useState([]);
	const [description, setDescription] = useState();
	const [purchase, setPurchase] = useState();
	const [invoiceUrl, setInvoiceUrl] = useState();
    const [editInvoice, setEditInvoice] = useState(false);
    const [customerName, setCustomername] = useState();
    const [purchasedItem, setPurchasedItem] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [currentPayment, setCurrentPayment] = useState();




	const getPurchases = async () => {
		setIsLoading(true);
		const response = await fetch("/api/purchases", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (data.success) {
			setPurchases(data.purchases);
			setIsLoading(false);
		} else {
			alert(data.message);
			setIsLoading(false);
		}
	};
	const getInvoiceDetails = async () => {
		setIsLoading(true);
		const response = await fetch(`/api/invoices/${_id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		if (data.success) {
			setDescription(data.invoice.description);
			setInvoiceUrl(data.invoice.invoiceUrl);
            setPurchase(data.invoice.purchase);
            getPurchaseDetails(data.invoice.purchase);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			alert(data.message);
        }
        
	};
	const updateInvoice = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch(`/api/invoices/${_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				purchase,
				description,
				invoiceUrl,
			}),
		});
		const data = await response.json();
		if (data.success) {
			setIsLoading(false);
			alert(data.message);
		} else {
			setIsLoading(false);
			alert(data.message);
		}
    };
    const getPurchaseDetails = async(id) => {
        const response = await fetch(`/api/purchases/${id}`, {
            method: "GET",
            headers:{"Content-Type":"application/json"}
        })
        const data = await response.json()
        if (data.success) {
            setCustomername(data.purchase.customerName);
            setPurchasedItem(data.purchase.purchasedItem);
            setTotalPrice(data.purchase.totalPrice);
            setCurrentPayment(data.purchase.currentPayment);

        } else {
            alert(data.message)
        }
    }

	useEffect(() => {
		getInvoiceDetails();
		getPurchases();
	}, []);

	return (
		<div className="w-full h-full p-4 flex flex-col gap-4">
			<div className="w-full flex p-2 rounded bg-purple-900 items-center gap-2">
				<button onClick={() => router.back()} className="text-white font-bold">
					<ArrowLeftIcon className="h-6 w-6" />
				</button>
				<h1 className="text-white font-semibold">Invoice Details</h1>
			</div>
			<div className="w-full flex flex-col">
				<div className="flex w-full items-center justify-end">
					<button
						className="bg-purple-900 rounded py-2 px-4 text-white text-sm"
						onClick={() => setEditInvoice(!editInvoice)}
					>
						{editInvoice ? "Close" : "Edit"}
					</button>
				</div>
				{isLoading ? (
					<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
						<div className="flex flex-col items-center justify-center  w-full h-full">
							<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
						</div>
					</div>
				) : (
					<div className="flex flex-col w-full">
						{!editInvoice ? (
							<div className="md:grid md:grid-cols-3 gap-4">
								<div className="flex flex-col">
									<h1 className="text-xs font-semibold">Customer Name</h1>
									<input
										className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
										value={customerName}
										disabled
									/>
								</div>
								<div className="flex flex-col">
									<h1 className="text-xs font-semibold">Purchased Item</h1>
									<input
										className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
										value={purchasedItem}
										disabled
									/>
								</div>
								<div className="flex flex-col">
									<h1 className="text-xs font-semibold">Total Price</h1>
									<input
										className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
										value={totalPrice}
										disabled
									/>
								</div>
								<div className="flex flex-col">
									<h1 className="text-xs font-semibold">Current Payment</h1>
									<input
										className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
										value={currentPayment}
										disabled
									/>
								</div>
								<div className="flex flex-col">
									<h1 className="text-xs font-semibold">Outstandig Balance</h1>
									<input
										className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
										placeholder="description"
										value={totalPrice - currentPayment}
										onChange={(e) => setDescription(e.target.value)}
										disabled
									/>
								</div>
							</div>
						) : (
							<form
								className="md:grid md:grid-cols-3 gap-4"
								onSubmit={(e) => updateInvoice(e)}
							>
								<div className="flex flex-col">
									<h1 className="text-xs font-semibold">Purchase</h1>
									<select
										className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
										onChange={(e) => setSelectedPurchase(e.target.value)}
									>
										{purchases.map((purchase, index) => (
											<option
												value={purchase._id}
												className="text-black text-xs"
												key={index}
											>
												{`${purchase.purchasedItem}-${purchase.customerName}`}
											</option>
										))}
									</select>
								</div>
								<div className="flex flex-col">
									<h1 className="text-xs font-semibold">Invoice Description</h1>
									<input
										className="border rouded border-gray-900 rounded bg-transparent p-2 text-sm"
										placeholder="description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>
								<div className="flex flex-col w-full gap-1">
									<h1 className="text-xs font-semibold">upload invoice(pdf)</h1>
									<CldUploadButton
										className="border border-black text-black rounded text-white rounded p-1"
										uploadPreset="sokoimgs"
										onSuccess={(results, options) =>
											uploadSuccess(results, options)
										}
									/>
								</div>
								<button className="bg-purple-900 rounded p-2 text-white">
									Submit
								</button>
							</form>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
