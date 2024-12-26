"use client"
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import Link from "next/link";
import { CldUploadButton } from "next-cloudinary";

export default function SupportingDocs() {

    const uploadSuccess = () => {

    }
	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Lease Vehicle"} />

			<div className="bg-white rounded shadow flex flex-col gap-4 p-4">
				<div className="md:col-span-3">
					<h1 className="font-semibold text-sm">Supporting Documents</h1>
					<p className="text-sm">
						Agreement of Sale, Proof of residence, etc...
					</p>
				</div>
				<CldUploadButton
					className="border-2 border-dashed border-gray-400 h-16"
					uploadPreset="sokoimgs"
					onSuccess={(results, options) => uploadSuccess(results, options)}
				/>
				<button className="w-32 bg-purple-900 rounded text-white p-2">Finish</button>
			</div>
		</div>
	);
}
