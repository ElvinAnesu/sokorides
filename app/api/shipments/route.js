import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Shipment from "@/app/models/shipment";

export async function POST(request) {
	const {
		customername,
		customerphone,
		customeremail,
		purchaseditem,
		origin,
		destination,
		update,
		price,
	} = await request.json();

	try {
		connectdb();
		const shipment = await Shipment.create({
			customername,
			customerphone,
			customeremail,
			purchaseditem,
			origin,
			destination,
			update,
			price,
		});
		if (!shipment) {
			return NextResponse.json({
				success: false,
				message: "Failed to create shipment",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Shipment successfully added",
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while creating shipment",
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
		await connectdb();
		const totalShipments = await Shipment.countDocuments(query);
		const shipments = await Shipment.find(query)
			.skip((page - 1) * pageSize)
			.limit(pageSize);

		if (!shipments) {
			return NextResponse.json({
				success: false,
				message: "Failed getting shipments",
			});
		}

		return NextResponse.json({
			success: true,
			message: "Shipments fetched successfully",
			totalShipments,
			shipments,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while fetching the shipmnets",
		});
	}
}
