import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Payment from "@/app/models/payment";

export async function GET(request, props) {
    const params = await props.params;
    const { _id } = params;
    try {
		connectdb();
		const payment = await Payment.findById(_id);
		if (!payment) {
			return NextResponse.json({
				success: false,
				message: "Payment Details not found",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Payment Details fetched successfully",
			payment,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while fetching payment details",
		});
	}
}

export async function PUT(request, props) {
    const params = await props.params;
    const { _id } = params;
    const { fullname, amount, paymentMethod, date, description } =
		await request.json();
    try {
		connectdb();
		const updatePayment = await Payment.findByIdAndUpdate(_id, {
			fullname,
			amount,
			paymentMethod,
			date,
			description,
		});
		if (!updatePayment) {
			return NextResponse.json({
				success: false,
				message: "Failed to update payment details",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Payment details updated successfully",
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while updating payment details",
		});
	}
}

export async function DELETE(request, props) {
    const params = await props.params;
    const { _id } = params;
    try {
		connectdb();
		const deletepayment = await Payment.findByIdAndDelete(_id);
		if (!deletepayment) {
			return NextResponse.json({
				success: false,
				message: "Failed to delete payment",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Payment record deleted successfully",
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while deleting payment",
		});
	}
}
