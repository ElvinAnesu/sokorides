import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import Searchbar from "@/app/components/dashboard/common/searchbar";
import { Suspense } from "react";
import CreateNewBtn from "@/app/components/dashboard/common/createnewbtn";
import PurchasesTable from "@/app/components/dashboard/tables/purchasestable";
import { getPurchasesPages } from "@/lib/actions";
import Pagination from "@/app/components/dashboard/common/pagination"; 
import { RecentPurchasesSkeleton } from "@/app/components/skeletons/skeletons";

export default async function Purchases({ searchParams }) { 

	const _searchParams = await searchParams;
	const query = _searchParams?.query || "";
	const currentPage = Number(_searchParams?.page) || 1;
	const totalPages = await getPurchasesPages() 

	return (
		<div className="w-full h-full p-4 flex flex-col gap-4">
			<BreadCrumb title={"Purchases"} />
			<div className="flex flex-col w-full bg-white rounded px-4 py-2">
				<div className="flex w-full items-center justify-between">
					<Searchbar />
					<CreateNewBtn url={"/dashboard/purchases/createnew"} />
				</div>
				<Suspense fallback={<RecentPurchasesSkeleton />}>
					<PurchasesTable query={query} currentPage={currentPage} />
				</Suspense>
				<div className="mt-5 flex w-full justify-center">
					<Pagination totalPages={totalPages} />
				</div>
			</div>
		</div>
	);
}
