import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Invoice from "@/app/models/invoice";

export async function GET(request, { params }) {
	const { _id } = params;
	try {
		connectdb();
		const invoice = await Invoice.findById(_id);
		if (!invoice) {
			return NextResponse.json({
				success: false,
				message: "Failed to fetch invoice",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Invoice fetched successfully",
			invoice,
		});
	} catch (error) {
		console.log("Error: ", error.message);
		return NextResponse.json({
			success: false,
			message: `Error:${error.message}`,
		});
	}
}

export async function DELETE(request, { params }) {
	const { _id } = params;
    try {
        connectdb()
		const deletedInvoice = await Invoice.findByIdAndDelete(_id);
		if (!deletedInvoice) {
			return NextResponse.json({
				success: false,
				message: "Failed to delete invoice",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Invoice deleted successfully",
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json({
			success: false,
			message: `Error:${error.message}`,
		});
	}
}

export async function PUT(request, { params }) {
	const { _id } = params;
	const { purchase, description, invoiceUrl } = await request.json();
	try {
		connectdb();
		const updateInvoice = await Invoice.findByIdAndUpdate(_id, {
			purchase,
			description,
			invoiceUrl,
		});
		if (!updateInvoice) {
			return NextResponse.json({
				success: false,
				message: "Failed to update invoice",
			});
		}
		return NextResponse.json({
			success: true,
			message: "",
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json({
			success: false,
			message: `Error: ${error.message}`,
		});
	}
}
