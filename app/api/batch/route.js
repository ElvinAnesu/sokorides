import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Batch from "@/app/models/batch";

export async function POST(request) {
	const { batchName, shipments, updates } = await request.json();
	try {
		connectdb();
		const batch = await Batch.create({
			batchName,
			shipments,
			updates,
		});

		if (!batch) {
			return NextResponse.json({
				success: false,
				message: "faile to create batch",
			});
		}
		return NextResponse.json({
			success: true,
			message: "batch created successfully",
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json({
			success: false,
			message: "Error while creating batch",
		});
	}
}

export async function GET(request, { params }) {
	try {
		connectdb();
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page"), 10) || 1;
		const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;

		const totalBatches = await Batch.countDocuments();
		const batches = await Batch.find()
			.sort({ _id: -1 })
			.skip((page - 1) * pageSize)
			.limit(pageSize);

		if (!batches) {
			return NextResponse.json({
				success: false,
				message: "Failed to fetch batches",
			});
		}

		return NextResponse.json({
			success: true,
			message: "Batches fetched successfully",
			totalBatches,
			batches,
		});

	} catch (error) {
		console.log("Error: ",error.message);
		return NextResponse.json({
			success: false,
			message: "Error while fetching batches",
		});
	}
}
