import InvoicesTable from "@/app/components/tables/invoicestable";


export default function Invoices() {
    return (
			<div className="w-full h-full p-4 flex flex-col gap-4">
				<div className="w-full flex p-2 rounded bg-purple-900 ">
					<h1 className="text-white font-semibold">Invoices</h1>
				</div>
				<InvoicesTable />
			</div>
		);
}