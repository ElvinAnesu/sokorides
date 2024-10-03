import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Invoice from "@/app/models/invoice";

export async function POST(request) {
	const { firstname, surname, phonenumber, description, invoiceUrl } =
		await request.json();

	try {
		connectdb();
		const newInvoice = await Invoice.create({
			firstname,
			surname,
			phonenumber,
			description,
			invoiceUrl,
		});

		if (!newInvoice) {
			return NextResponse.json({
				success: false,
				message: "Failed to upload invoice",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Invoice Added successfully",
		});
	} catch (error) {
		console.log("Error: ", error.message);
		return NextResponse.json({
			success: false,
			message: "Error while creating the invoice",
		});
	}
}

export async function GET(request, { params }) {
	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get("page")) || 1;
	const pageSize = parseInt(searchParams.get("pageSize")) || 10;
	const searchQuery = searchParams.get("searchQuery");

	const query =
		searchQuery != "null" && searchQuery != null
			? {
					$and: [
						{
							$or: [
								{ productname: { $regex: new RegExp(searchQuery, "i") } },
								{ description: { $regex: new RegExp(searchQuery, "i") } },
							],
						},
					],
			  }
            : {};
     try {
				connectdb();
				const totalInvoices = await Invoice.countDocuments(query);
		 const invoices = await Invoice.find(query)
					.sort({_id:-1})
					.skip((page - 1) * pageSize)
					.limit(pageSize);

				if (!invoices) {
					return NextResponse.json({
						success: false,
						message: "failed to fetch invoices",
					});
				}

				return NextResponse.json({
					success: true,
					message: "invoices fetched successfully",
					totalInvoices,
					page,
					pageSize,
					invoices,
				});
			} catch (error) {
				console.log(error);
				return NextResponse.json({
					success: false,
					message: "Error while fetching the invoices",
					error,
				});
			}
}
