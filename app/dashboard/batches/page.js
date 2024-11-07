import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import Searchbar from "@/app/components/dashboard/common/searchbar";
import { Suspense } from "react";
import CreateNewBtn from "@/app/components/dashboard/common/createnewbtn";
import { getUsersPages } from "@/lib/actions";
import Pagination from "@/app/components/dashboard/common/pagination";
import { RecentPurchasesSkeleton } from "@/app/components/skeletons/skeletons";
import BatchesTable from "@/app/components/dashboard/tables/batchestable";

export default async function Batches({ searchParams }) { 

	const _searchParams = await searchParams;
	const query = _searchParams?.query || "";
	const currentPage = Number(_searchParams?.page) || 1;
	const totalPages = await getUsersPages();

	return (
		<div className="w-full h-full p-4 flex flex-col gap-4">
			<BreadCrumb title={"Users"} />
			<div className="flex flex-col w-full bg-white rounded px-4 py-2">
				<div className="flex w-full items-center justify-between">
					<Searchbar />
					<CreateNewBtn url={"/dashboard/users/createnew"} />
				</div>
				<Suspense fallback={<RecentPurchasesSkeleton />}>
					<BatchesTable query={query} currentPage={currentPage} />
				</Suspense>
				<div className="mt-5 flex w-full justify-center">
					<Pagination totalPages={totalPages} />
				</div>
			</div>
		</div>
	);
}
