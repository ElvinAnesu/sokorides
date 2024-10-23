import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Customer from "@/app/models/customer";


export async function GET() {

	try {
		connectdb();
		const customers = await Customer.find()
		if (!customers) {
			return NextResponse.json({
				success: false,
				message: "Failed to fetch customers",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Customers fetched successfully",
			customers,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while fetching customers",
		});
	}
}