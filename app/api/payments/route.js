import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Payment from "@/app/models/payment";

export async function POST(request) {
	const { fullname, amount, paymentMethod, date, description } =
		await request.json();

	try {
		connectdb();
		const payment = await Payment.create({
			fullname,
			amount,
			paymentMethod,
			date,
			description,
		});
		if (!payment) {
			return NextResponse.json({
				success: false,
				message: "Failed to record payment",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Payment recorderd successfully",
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: true,
			message: "Error while creating payment",
		});
	}
}

export async function GET(request, { params }) {
	try {
		connectdb();
		const payments = await Payment.find();
		if (!payments) {
			return NextResponse.json({
				success: false,
				message: "Failed to fettch payments",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Payments fetched successfully",
			payments,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while fetching payments",
		});
	}
}
