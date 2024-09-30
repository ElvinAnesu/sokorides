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

export async function GET(request) {
	try {
		connectdb();
		const batches = await Batch.find();
		if (!batches) {
			return NextResponse.json({
				success: false,
				message: "Failed to fetch batches",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Batches fetched successfully",
			batches,
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json({
			success: false,
			message: "Error while fetching batches",
		});
	}
}
