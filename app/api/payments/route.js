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
		const totalPayments = await Payment.countDocuments(query)
		const payments = await Payment.find(query)
			.sort({_id: -1})
			.skip((page - 1) * pageSize)
			.limit(pageSize);


		if (!payments) {
			return NextResponse.json({
				success: false,
				message: "Failed to fettch payments",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Payments fetched successfully",
			totalPayments,
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
