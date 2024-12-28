"use client";
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import { CldUploadButton } from "next-cloudinary";
import { use, useState } from "react";
import { addLeaseDocuments } from "@/lib/server-actions/lease";
import Link from "next/link";

export default function SupportingDocs({ params }) { 

	const _id = use(params);
	const [documentUrl, setDocumentUrl] = useState();
	const [documentType, setDocumentType] = useState();

	const uploadSuccess = (results, options) => {  
		setDocumentUrl(results.info.url,)   
	}; 

	const _addDocs = async () => {
		await addLeaseDocuments(_id, documentUrl, documentType);
	};

	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Lease Vehicle"} />
			<div className="bg-white rounded shadow flex flex-col gap-4 p-4">
				<div className="md:col-span-3">
					<h1 className="font-semibold text-sm">Supporting Documents</h1>
					<p className="text-xs">
						Agreement of Sale, Proof of residence, etc...
					</p>
				</div>
				<div>
					{documentType && (
						<div>
							<h1 className="text-sm font-semibold">
								Document Type: {documentType}
							</h1>
						</div>
					)}
					{documentUrl && (
						<div>
							<h1 className="text-sm font-semibold">
								Document Url:{" "}
								<span className="font-normal text-purple-900">
									{documentUrl}
								</span>
							</h1>
						</div>
					)}
					{documentUrl && documentType && (
						<div className="mt-4">
							<button
								className="bg-purple-900 rounded text-white py-2 px-4"
								onClick={_addDocs}
							>
								Upload Document
							</button>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="documentType" className="text-sm font-semibold">
						Select Document Type
					</label>
					<select
						id="documentType"
						value={documentType}
						onChange={(e) => setDocumentType(e.target.value)}
						className="border border-gray-300 rounded p-2"
					>
						<option value="">Select a type</option>
						<option value="Agreement of Sale">Agreement of Sale</option>
						<option value="Proof of Residence">Proof of Residence</option>
						<option value="ID">ID</option>
						<option value="POP">POP</option>
						<option value="Affidavit">Affidavit</option>
					</select>
				</div>
				<CldUploadButton
					className="border-2 border-dashed border-gray-400 h-16"
					uploadPreset="sokoimgs"
					onSuccess={uploadSuccess}
				/>
				<div className="flex items-center justify-end">
					<Link
						href={`/dashboard/rent-to-buy/leasedcars/${_id._id}`}
						className="w-32 bg-purple-900 rounded text-white p-2 flex items-center justify-center"
					>
						Skip
					</Link>
				</div>
			</div>
		</div>
	);
}
