import { ClockIcon, CheckIcon } from "@radix-ui/react-icons";

export default function InvoiceStatus({ status }) {
	return (
		<div>
			{status ? (
				<span className="flex gap-2 items-center bg-green-200 rounded-full justify-center">
					<CheckIcon />
					paid
				</span>
			) : (
				<span className="flex gap-2 items-center bg-gray-200 rounded-full justify-center">
					<ClockIcon />
					pending
				</span>
			)}
		</div>
	);
}
