const shimmer =
	"before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";



export function CardSkeleton() {
    return (
        <div
            className={`${shimmer} w-full relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
        >
            <div className="flex p-4">
                <div className="h-5 w-5 rounded-md bg-gray-200" />
                <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
            </div>
            <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
                <div className="h-7 w-20 rounded-md bg-gray-200" />
            </div>
        </div>
    );
}

export function CardsSkeleton() {
    return (
			<div className="flex w-full gap-4">
				<div className="w-full">
					<CardSkeleton />
				</div>
				<div className="w-full">
					<CardSkeleton />
				</div>
				<div className="w-full">
					<CardSkeleton />
				</div>
				<div className="w-full">
					<CardSkeleton />
				</div>
			</div>
		);
} 

export function RecentPurchasesSkeleton() {
    return (
			<div
				className={`${shimmer} w-full relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
			>
				<div className="flex p-4 items-center justify-between">
					<div className="h-5 w-12 rounded-md bg-gray-200" />
					<div className="h-5 w-12 rounded-md bg-gray-200" />
					<div className="h-5 w-12 rounded-md bg-gray-200" />
					<div className="h-5 w-12 rounded-md bg-gray-200" />
				</div>
				<div className="flex flex-col gap-2 items-center justify-center truncate rounded-xl bg-white px-4 py-8">
					<div className="h-7 w-full rounded-md bg-gray-200" />
					<div className="h-7 w-full rounded-md bg-gray-200" />
					<div className="h-7 w-full rounded-md bg-gray-200" />
				</div>
			</div>
		);
} 

export function RecentPaymentsSkeleton() {
	return (
		<div
			className={`${shimmer} w-full relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
		>
			<div className="flex p-4 items-center justify-between">
				<div className="h-5 w-12 rounded-md bg-gray-200" />
				<div className="h-5 w-12 rounded-md bg-gray-200" />
				<div className="h-5 w-12 rounded-md bg-gray-200" />
			</div>
			<div className="flex flex-col gap-2 items-center justify-center truncate rounded-xl bg-white px-4 py-8">
				<div className="h-7 w-full rounded-md bg-gray-200" />
				<div className="h-7 w-full rounded-md bg-gray-200" />
				<div className="h-7 w-full rounded-md bg-gray-200" />
			</div>
		</div>
	);
} 

export function DashBoardTablesSkeleton() {
    return (
        <div className="flex flex-col md:flex-row w-full gap-4">
            <RecentPurchasesSkeleton /> 
            <RecentPaymentsSkeleton />
        </div>
    )
}