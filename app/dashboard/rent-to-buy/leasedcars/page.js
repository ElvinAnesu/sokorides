import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import Pagination from "@/app/components/dashboard/common/pagination";
import SearchTable from "@/app/components/tables/searchtable";
import { Suspense } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const data = [
	{ _id: 1, name: "Car A", owner: "Owner A", price: 3000 },
	{ _id: 2, name: "Car B", owner: "Owner B", price: 4000 },
	// Add more data as needed
];
const columns = [
	{ Header: "Name", accessor: "name" },
	{ Header: "Owner", accessor: "owner" },
	{ Header: "Price", accessor: "price" },
];
const mobileColumns = [{ Header: "Name", accessor: "name" }];

export default async function leasedCars({ searchParams }) {
	const _searchParams = await searchParams;
	const query = _searchParams?.query || "";
	const currentPage = Number(_searchParams?.page) || 1;
	const totalPages = 1;

	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Leased Vehicle"} />
			<div className="flex flex-col w-full bg-white rounded px-4 py-2">
				<div className="flex w-full justify-end">
					<Link href={"/dashboard/rent-to-buy/leasedcars/createnew"} className="bg-purple-900 text-xs text-white p-2 rounded flex  gap-2">
						<PlusCircleIcon height={15} width={15} />
						<span>add new</span>
					</Link>
				</div>
				<Suspense fallback={<div></div>}>
					<div className="md:hidden">
						<SearchTable
							columns={mobileColumns}
							data={data}
							type={"leasedcars"}
						/>
					</div>
					<div className="hidden md:block">
						<SearchTable columns={columns} data={data} type={"leasedcars"} />
					</div>
				</Suspense>
				<div className="mt-5 flex w-full justify-center">
					<Pagination totalPages={totalPages} />
				</div>
			</div>
		</div>
	);
}
