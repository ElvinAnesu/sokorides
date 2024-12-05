import Link from "next/link";

export default function HomeCard({ title, _list }) {
	return (
		<div className="bg-white shadow rounded">
			<div className="p-4 bg-purple-900 rounded-t text-white ">
				<h1 className="font-medium">{title}</h1>
			</div>
			<div className="flex flex-col p-4">
				{_list?.length > 0 &&
					_list.map((item, index) => (
						<Link
							href={item?.url}
							className="my-2  border-b p-3 flex items-center justify-between"
							key={index}
						>
							<h1 className="font-semibold text-sm">{item.label}</h1>
						</Link>
					))}
			</div>
		</div>
	);
}
