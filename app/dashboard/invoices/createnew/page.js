"use client";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function Createnew() {
	const router = useRouter();
	const [purchases, setPurchases] = useState([]);
	const [selectedPurchase, setSelectedPurchase] = useState();
	const [description, setDescription] = useState();
	const [invoiceUrl, setInvoiceUrl] = useState();
	const [isLoading, setIsLoading] = useState(false);


	const uploadSuccess = (results, options) => {
		setInvoiceUrl(results.info.url);
	};

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

    const addInvoice = async (e) => {
        e.preventDefault();
		setIsLoading(true);
		const response = await fetch("/api/invoices", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				purchase: selectedPurchase,
				description,
				invoiceUrl,
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

	useEffect(() => {
		getPurchases();
	}, []);

	return (
		<div className="w-full h-full p-4 flex flex-col gap-4">
			<div className="w-full flex p-2 rounded bg-purple-900 items-center gap-2">
				<button onClick={()=> router.back()} className="text-white font-bold">
					<ArrowLeftIcon className="h-6 w-6"/>
				</button>
				<h1 className="text-white font-semibold">Add Invoice</h1>
			</div>
			<div className="w-full flex flex-col">
				{isLoading ? (
					<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
						<div className="flex flex-col items-center justify-center  w-full h-full">
							<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
						</div>
					</div>
				) : (
					<form className="md:grid md:grid-cols-3 gap-4" onSubmit={(e)=>addInvoice(e)}>
						<div className="flex flex-col">
							<h1 className="text-xs font-semibold">Purchase</h1>
							<select
								className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
								onChange={(e) => setSelectedPurchase(e.target.value)}
								>
									<option value="">Select Purchase</option>
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
		</div>
	);
}
