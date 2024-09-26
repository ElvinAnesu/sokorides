import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Purchase from "@/app/models/purchase";

export async function GET(request, { params }) {
	const { _id } = params;
	try {
		connectdb();
		const purchase = await Purchase.findById(_id);
		if (!purchase) {
			return NextResponse.json({
				success: false,
				message: "Purchase details not found",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Purchase details fetched successfully",
			purchase,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: "Error while fetching purchase details",
		});
	}
}
export async function PUT(request, { params }) {
	const { _id } = params;
	const {
		customerName,
		customerId,
		purchasedItem,
		vehicleStatus,
		totalPrice,
		currentPayment,
		gallery,
	} = await request.json();
	try {
		connectdb();
		const updatePurchase = await Purchase.findByIdAndUpdate(_id, {
			customerName,
			customerId,
			purchasedItem,
			vehicleStatus,
			totalPrice,
			currentPayment,
			gallery,
		});
		if (!updatePurchase) {
			return NextResponse.json({
				success: false,
				message: "Failed to update purchase",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Purchase details updated successfully",
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while updating purchase details",
		});
	}
}
export async function DELETE(request, { params }) {
	const { _id } = params;
	try {
		connectdb();
		const deleteRecord = await Purchase.findByIdAndDelete(_id);
		if (!deleteRecord) {
			return NextResponse.json({
				success: false,
				message: "Failed to delete purchase record",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Purchase record delete successfully",
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: "Error while deleting purchase record",
		});
	}
}
