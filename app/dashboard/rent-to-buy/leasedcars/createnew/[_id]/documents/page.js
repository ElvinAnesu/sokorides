"use client";
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import { CldUploadButton } from "next-cloudinary";
import { use, useState } from "react";
import { addLeaseDocuments } from "@/lib/server-actions/lease";
import Link from "next/link";

export default function SupportingDocs({ params }) {
	const _id = use(params);

	const [documents, setDocuments] = useState([]);
	const [documentType, setDocumentType] = useState();

	const uploadSuccess = (results, options) => {  
		pushDocument(results.url)		
	}; 

	const pushDocument = (_url) => {
		setDocuments((documents) => [
			...documents,
			{
				url: _url,
				type: documentType,
			},
		]);
	}

	const deleteDocument = (url) => {
		setDocuments(documents.filter((doc) => doc.url !== url));
	};
	const _addDocs = async () => await addLeaseDocuments(_id, documents);
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
				<div className="mb-4">
					<h2 className="font-semibold text-sm">Uploaded Documents</h2>
					{documents.length > 0 ? (
						<ul className="list-disc pl-5">
							{documents.map((doc, index) => (
								<li
									key={index}
									className="flex justify-between items-center py-1"
								>
									<span>
										{doc.type}:{" "}
										<a href={doc.url} className="text-blue-500 hover:underline">
											{doc.url}
										</a>
									</span>
									<button
										className="text-red-500 hover:underline"
										onClick={() => deleteDocument(doc.url)}
									>
										Delete
									</button>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500 text-sm">No documents uploaded yet.</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="documentType" className="text-sm font-semibold">
						Select Document Type:{documentType}
					</label>
					<select
						id="documentType"
					
						onChange={(e) => setDocumentType(e.target.value)}
						className="border border-gray-300 rounded p-2"
					>
						<option value="">Select a type</option>
						<option value="Agreement of Sale">Agreement of Sale</option>
						<option value="Proof of Residence">Proof of Residence</option>
						<option value="ID">ID</option>
						<option value="POP">POP</option>
						<option value="POP">Affidafit</option>
					</select>
				</div>
				<CldUploadButton
					className="border-2 border-dashed border-gray-400 h-16"
					uploadPreset="sokoimgs"
					onSuccess={(results, options) => uploadSuccess(results, options)}
				/>
				<div className="flex items-center justify-between">
					<button
						className="w-32 bg-purple-900 rounded text-white p-2"
						onClick={_addDocs}
					>
						Upload
					</button>
					<Link
						href={`/dashboard/rent-to-buy/leasedcars/${_id._id}`}
						className="w-32 bg-purple-900 rounded text-white p-2 flex items-center justify-center"
					>
						Finish
					</Link>
				</div>
			</div>
		</div>
	);
}
