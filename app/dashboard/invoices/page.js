import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import CreateNewBtn from "@/app/components/dashboard/common/createnewbtn";
import Pagination from "@/app/components/dashboard/common/pagination";
import Searchbar from "@/app/components/dashboard/common/searchbar";
import InvoicesTable from "@/app/components/dashboard/tables/invoicestable";
import { RecentPurchasesSkeleton } from "@/app/components/skeletons/skeletons";
import { getInvoicesPages } from "@/lib/actions";
import { Suspense } from "react";

export default async function Invoices({ searchParams }) {

	const _searchParams = await searchParams;
	const query = _searchParams?.query || "";
	const currentPage = Number(_searchParams?.page) || 1;
	const totalPages = await getInvoicesPages(query);

	return (
		<div className="w-full h-full p-4 flex flex-col gap-4">
			<BreadCrumb title={"Invoices"} />
			<div className="flex flex-col w-full bg-white rounded px-4 py-2">
				<div className="flex w-full items-center justify-between">
					<Searchbar />
					<CreateNewBtn url={"/dashboard/invoices/createnew"} />
				</div>
				<Suspense fallback={<RecentPurchasesSkeleton />}>
					<InvoicesTable query={query} currentPage={currentPage} />
				</Suspense>
				<div className="mt-5 flex w-full justify-center">
					<Pagination totalPages={totalPages} />
				</div>
			</div>
		</div>
	);
}
