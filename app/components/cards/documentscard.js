import { FileIcon , ArrowRightIcon} from "@radix-ui/react-icons";
import Link from "next/link";

const documents = [
	{
		title: "Elvin kakomo agreement of sale",
	},
	{
		title: "Elvin kakomo agreement of sale",
	},
	{
		title: "Elvin kakomo agreement of sale",
	},
	{
		title: "Elvin kakomo agreement of sale",
	},
];

export default function DocumnetsCard() {
	return (
		<div className="w-full rounded shadow bg-white">
			<div className="rounded-t bg-purple-900 p-2 flex items-center justify-between">
				<h5 className="text-white">Documents / Contracts</h5>
				<Link
					href={"/dashboard/rent-to-buy/documents"}
					className="text-white flex items-center gap-2"
				>
					View
					<ArrowRightIcon className="w-4 h-4" fontSize={24} />
				</Link>
			</div>
			<div className="p-4">
				{documents.map((_document, index) => (
					<div className="border-b gap-2 my-2 py-2 text-sm" key={index}>
						<div className="flex gap-2 font-bold items-center text-xs">
							<FileIcon />
							<h1>{_document.title}</h1>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
