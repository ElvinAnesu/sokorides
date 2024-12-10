

import { SpeakerLoudIcon } from "@radix-ui/react-icons";

const notoifications = [
	{
		date: "01 Dec 2024",
		message: "Your payment of $300 will be due in 3 days",
	},
	{
		date: "01 Dec 2024",
		message: "Your payment of $300 will be due in 3 days",
	},
	{
		date: "01 Dec 2024",
		message: "Your payment of $300 will be due in 3 days",
	},
];

export default function NotificationsCard() {
	return (
		<div className="w-full rounded shadow bg-white">
			<div className="rounded-t bg-purple-900 p-2">
				<h5 className="text-white">Notifications</h5>
			</div>
			<div className="p-4">
				{notoifications.map((_notification, index) => (
					<div className="border-b gap-2 my-2 text-sm" key={index}>
						<div className="flex gap-2 font-bold items-center text-xs">
							<SpeakerLoudIcon />
							{_notification.date}
						</div>
						<p>{_notification.message}</p>
					</div>
				))}
			</div>
		</div>
	);
}
