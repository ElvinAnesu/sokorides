import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import Pagination from "@/app/components/dashboard/common/pagination";
import SearchTable from "@/app/components/tables/searchtable";

const data = [

	// Add more data as needed
];
const columns = [
	{ Header: "Transaction", accessor: "transaction" },
	{ Header: "Customer", accessor: "customer" },
	{ Header: "Amount", accessor: "amount" }
];
export default async function Transactions ({ searchParams }) {
	const _searchParams = await searchParams;
	const query = _searchParams?.query || "";
	const currentPage = Number(_searchParams?.page) || 1;
	const totalPages = 1;

	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Transactions"} />
			<div className="flex flex-col w-full bg-white rounded px-4 py-2">
				<SearchTable columns={columns} data={data} type={"transactions"}/>
				<div className="mt-5 flex w-full justify-center">
					<Pagination totalPages={totalPages} />
				</div>
			</div>
		</div>
	);
}
