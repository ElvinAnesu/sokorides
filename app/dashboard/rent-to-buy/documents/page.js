import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import Pagination from "@/app/components/dashboard/common/pagination";
import SearchTable from "@/app/components/tables/searchtable";

const data = [
	{ id: 1, document: "Elvin Kakomo agreement of sale", url: "/mukute" },
	// Add more data as needed
];
const columns = [
	{ Header: "Document", accessor: "document" },
];
export default async function Documents({ searchParams }) {
	const _searchParams = await searchParams;
	const query = _searchParams?.query || "";
	const currentPage = Number(_searchParams?.page) || 1;
	const totalPages = 1;

	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Documents / Contracts"} />
			<div className="flex flex-col w-full bg-white rounded px-4 py-2">
				<SearchTable columns={columns} data={data} type={"documents"}/>
				<div className="mt-5 flex w-full justify-center">
					<Pagination totalPages={totalPages} />
				</div>
			</div>
		</div>
	);
}
