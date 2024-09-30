import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Shipment from "@/app/models/shipment";
import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function PUT(request) {
	try {
		const { _id, update } = await request.json();
		await connectdb();
		const updatedShipment = await Shipment.findByIdAndUpdate(
			_id,
			{ $push: { update: update } },
			{ new: true }
		);
		if (!updatedShipment) {
			return NextResponse.json({
				success: false,
				message: "Failed to update shipment",
			});
		}
		const customerPhone = updatedShipment.customerphone?.slice(1);
		if (customerPhone) {
			const message = update || "No update available";
			const notificationSent = await sendWhatsappMessage(
				message,
				customerPhone
			);
			const responseMessage = notificationSent
				? "Shipment updated successfully, and notification sent"
				: "Shipment updated successfully, but notification sending failed";
			return NextResponse.json({
				success: true,
				message: responseMessage,
				updatedShipment,
			});
		} else {
			return NextResponse.json({
				success: true,
				message:
					"Shipment updated successfully, but invalid customer phone number",
				updatedShipment,
			});
		}
	} catch (error) {
		console.error("Error while updating the shipment:", error);
		return NextResponse.json({
			success: false,
			message: "Error while updating the shipment",
		});
	}
}

async function sendWhatsappMessage(message, to) {
	try {
		await client.messages.create({
			body: message,
			from: "whatsapp:+17744893074",
			to: `whatsapp:+263${to}`,
		});
		return true;
	} catch (error) {
		console.error("Failed to send WhatsApp message:", error);
		return false;
	}
}
