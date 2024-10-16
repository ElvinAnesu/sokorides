import { NextResponse } from "next/server";
import connectdb from "@/mongodb";
import Invoice from "@/app/models/invoice";

export async function POST(request) {
	const { purchase, description, invoiceUrl } = await request.json();
	console.log("purchases:", purchase)
	console.log("description", description);
	console.log("invoiceUrl:", invoiceUrl);
	try {
		connectdb();
		const createInvoice = await Invoice.create({
			purchase,
			description,
			invoiceUrl,
		});

		if (!createInvoice) {
			return NextResponse.json({
				success: "false",
				message: "Failed to create invoice",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Invoice created successfully",
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse({
			success: false,
			message: `Error: ${error.message}`,
		});
	}
}

export async function GET(request, { params }) {
	try {
		connectdb();
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page"), 10) || 1;
		const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;

		const totalInvoices = await Invoice.countDocuments();
		const invoices = await Invoice.aggregate([
			{
				$lookup: {
					from: "purchases", // Collection name you're referencing
					localField: "purchase", // Field in the Invoice schema
					foreignField: "_id", // Field in the Purchases collection (its _id)
					as: "purchasedItem", // Result field name for joined documents
				},
			},
			{ $unwind: "$purchasedItem" }, // Optionally add this if you expect one purchase per invoice
			{ $sort: { _id: -1 } }, // Sort by _id in descending order
			{ $skip: (page - 1) * pageSize }, // Skip documents for pagination
			{ $limit: pageSize }, //
		]);
		if (!invoices) {
			return NextResponse.json({
				success: false,
				message: "Failed to fetch invoices",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Invoices fetched successfully",
			totalInvoices,
			invoices,
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse({
			success: false,
			message: `Error: ${error.message}`,
		});
	}
}
