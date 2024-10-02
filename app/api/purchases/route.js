import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Purchase from "@/app/models/purchase";

export async function POST(request, { params }) {
	const {
		customerName,
		customerId,
		purchasedItem,
		vehicleStatus,
		totalPrice,
		currentPayment,
		gallery,
		customerPhonenumber,
	} = await request.json();

	try {
		connectdb();
		const recordPuchase = await Purchase.create({
			customerName,
			customerId,
			purchasedItem,
			vehicleStatus,
			totalPrice,
			currentPayment,
			gallery,
			customerPhonenumber,
		});

		if (!recordPuchase) {
			return NextResponse.json({
				success: false,
				message: "Faied to record purchases",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Purchase recorded successfully",
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error recording purchases",
		});
	}
}
export async function GET(request, { params }) {
	try {
		await connectdb();
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page"), 10) || 1;
		const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;

		const totalPurchases = await Purchase.countDocuments();
		const purchases = await Purchase.find()
			.sort({ _id: -1 })
			.skip((page - 1) * pageSize)
			.limit(pageSize);

		if (!purchases) {
			return NextResponse.json({
				success: false,
				message: "Failed to fetch purchases",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Purchases fetched successfully",
			totalPurchases,
			purchases,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while fetching purchases",
		});
	}
}
