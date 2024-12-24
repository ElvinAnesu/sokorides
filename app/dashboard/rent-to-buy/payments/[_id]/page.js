import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";

export default function TransactionDetails() {
	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Transactions"} />
			<div className="w-full p-4 rounded bg-white ">
				<div className="rounded-lg bg-gray-200 p-4 flex flex-col gap-4">
					<h1 className="font-semibold text-sm">Payment Details</h1>
					<div className="bg-white rounded p-4 text-sm ">
						<div className="grid grid-cols-1 md:grid-cols-3 border-b py-4">
							<div className="flex items-center  gap-8">
								<h1>Due Date:</h1>
								<h1 className="font-semibold">02 Jan 2023</h1>
							</div>
							<div className="flex items-center  gap-8">
								<h1>Customer:</h1>
								<h1 className="font-semibold">Elvin Kakoomo</h1>
							</div>
							<div className="flex items-center  gap-8">
								<h1>Amount:</h1>
								<h1 className="font-semibold">30000</h1>
							</div>
						</div>
						<div className="mt-4">
							<h1 className="font-semibold">Description:</h1>
							<h1>Monthly payment</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
