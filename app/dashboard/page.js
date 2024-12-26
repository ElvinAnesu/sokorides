import { Suspense } from "react";
import { lusitana } from "../fonts/fonts";
import CardSection from "../components/dashboard/sections/cardsections";
import TableSection from "../components/dashboard/sections/tablesection";
import {
	CardsSkeleton,
	DashBoardTablesSkeleton,
} from "../components/skeletons/skeletons";

export default function DashBoard() {
	return (
		<div className="w-full h-full p-4 gap-4 flex flex-col">
			<div className="w-full flex p-2 rounded">
				<h1
					className={`${lusitana.className} text-purple-700 text-2xl font-bold`}
				>
					Dashboard
				</h1>
			</div>
			<Suspense fallback={<CardsSkeleton />}>
				<CardSection />
			</Suspense>
			<Suspense fallback={<DashBoardTablesSkeleton />}>
				<TableSection />
			</Suspense>
		</div>
	);
}
