import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import Pagination from "@/app/components/dashboard/common/pagination";
import { RecentPurchasesSkeleton } from "@/app/components/skeletons/skeletons";
import SearchTable from "@/app/components/tables/searchtable";
import { Suspense } from "react";

const data = [

	// Add more data as needed
];
const columns = [
	{ Header: "Customer", accessor: "customer" },
	{ Header: "Descriptio", accessor: "description" },
	{ Header: "Status", accessor: "status" },
	{ Header: "Amount", accessor: "amount" },
];

const mobileColums = [
	{ Header: "Customer", accessor: "customer" },
	{ Header: "Amount", accessor: "amount" },
];
export default async function Payments({ searchParams }) {
	const _searchParams = await searchParams;
	const query = _searchParams?.query || "";
	const currentPage = Number(_searchParams?.page) || 1;
	const totalPages = 1;

	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Payments"} />
			<div className="flex flex-col w-full bg-white rounded px-4 py-2">
				<Suspense fallback={<RecentPurchasesSkeleton />}>
					<div className="hidden md:block">
						<SearchTable columns={columns} data={data} type={"payments"} />
					</div>
					<div className="md:hidden">
						<SearchTable columns={mobileColums} data={data} type={"payments"} />
					</div>
				</Suspense>
				<div className="mt-5 flex w-full justify-center">
					<Pagination totalPages={totalPages} />
				</div>
			</div>
		</div>
	);
}
