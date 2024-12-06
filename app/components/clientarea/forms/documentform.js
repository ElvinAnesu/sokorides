import { EyeIcon } from "@heroicons/react/24/outline";
import { DownloadIcon } from "@radix-ui/react-icons";

export default function DocumentsForm() {
	return (
		<div className="bg-white rounded shadow">
			<div className="rounded-t bg-purple-900 p-2">
				<h5 className="text-white">Supporting Documents</h5>
			</div>
			<div className="flex flex-col p-4 gap-4">
				<div className="bg-gray-300 border border-gray-300 rounded w-full flex items-center justify-between p-2">
					<h1>Agreement of sale</h1>
					<div className="flex item-center gap-4">
						<button>
							<EyeIcon />
						</button>
						<button>
							<DownloadIcon />
						</button>
					</div>
				</div>
				<div className="bg-gray-300 border border-gray-300 rounded w-full flex items-center justify-between p-2">
					<h1>National Id</h1>
					<div className="flex item-center gap-4">
						<button>
							<EyeIcon />
						</button>
						<button>
							<DownloadIcon />
						</button>
					</div>
				</div>
				<div className="bg-gray-300 border border-gray-300 rounded w-full flex items-center justify-between p-2">
					<h1>Proof of residence</h1>
					<div className="flex item-center gap-4">
						<button>
							<EyeIcon />
						</button>
						<button>
							<DownloadIcon />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
