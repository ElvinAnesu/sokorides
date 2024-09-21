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
		connectdb();
		const purchases = await Purchase.find();
		if (!purchases) {
			return NextResponse.json({
				success: false,
				message: "Failed to fetch purchases",
			});
		}
		return NextResponse.json({
			success: true,
            message: "Purchases fetched successfully",
            purchases
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while fetching purchases",
		});
	}
}
