"use server";
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import Pagination from "@/app/components/dashboard/common/pagination";
import SearchTable from "@/app/components/tables/searchtable";
import { Suspense } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getPaginatedLeases } from "@/lib/server-actions/lease";
const columns = [
	{ Header: "Client", accessor: "clientSurname" },
	{ Header: "Car", accessor: "leasedCar" },
	{ Header: "Price", accessor: "totalPrice" },
];
const mobileColumns = [{ Header: "Client", accessor: "clientSurname" }];

export default async function leasedCars({ searchParams }) {
	const _searchParams = await searchParams;
	const query = _searchParams?.query || "";
	const currentPage = Number(_searchParams?.page) || 1;
	const totalPages = 1;

	const data = await getPaginatedLeases();

	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Leased Vehicle"} />
			<div className="flex flex-col w-full bg-white rounded px-4 py-2">
				<div className="flex w-full justify-end">
					<Link
						href={"/dashboard/rent-to-buy/createnew"}
						className="bg-purple-900 text-xs text-white p-2 rounded flex  gap-2"
					>
						<PlusCircleIcon height={15} width={15} />
						<span>add new</span>
					</Link>
				</div>
				<Suspense fallback={<div></div>}>
					<div className="md:hidden">
						<SearchTable
							columns={mobileColumns}
							data={data}
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
