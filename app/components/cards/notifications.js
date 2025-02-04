import Link from "next/link";

import { SpeakerLoudIcon, ArrowRightIcon } from "@radix-ui/react-icons";

const notoifications = [
];

export default function NotificationsCard() {
	return (
		<div className="w-full rounded shadow bg-white">
			<div className="rounded-t bg-purple-900 p-2 flex items-center justify-between">
				<h5 className="text-white ">Notifications</h5>
				<Link
					href={"/dashboard/rent-to-buy/notifications"}
					className="text-white flex items-center gap-2"
				>
					View
					<ArrowRightIcon className="w-4 h-4" fontSize={24} />
				</Link>
			</div>
			<div className="p-4">
				{notoifications?.length > 0 ? (
					notoifications.map((_notification, index) => (
					<div className="border-b gap-2 my-2 text-sm" key={index}>
						<div className="flex gap-2 font-bold items-center text-xs">
							<SpeakerLoudIcon />
							{_notification.date}
						</div>
						<p>{_notification.message}</p>
					</div>
				))
				) : (
						<div className="text-center"> 
							<p>No new notifcations available</p>
						</div>
				)}
			</div>
		</div>
	);
}
