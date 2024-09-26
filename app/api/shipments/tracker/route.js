import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Shipment from "@/app/models/shipment";
import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function PUT(request) {
	const { _id, update } = await request.json();

	console.log("send values are:", _id, update);

	try {
		connectdb();
		const updateshipment = await Shipment.findByIdAndUpdate(
			_id,
			{
				$push: { update: update },
			},
			{ new: true } //
		);
		if (!updateshipment) {
			return NextResponse.json({
				success: false,
				message: "Failed to update shipment",
			});
		}
		//get the update
		const notification = update;
		const customernumber = updateshipment.customerphone;

		const receiver = customernumber ? customernumber.slice(1) : null;
		const message = notification ? notification : null;
		if (receiver && message) {
			const reply = sendWhatsappMessage(message, receiver);
			if (reply) {
				return NextResponse.json({
					success: true,
					message: "shipment updated successfully, and notification sent",
					updateshipment,
				});
			} else {
				return NextResponse.json({
					success: true,
					message: "shipment updated successfully, notification sending failed",
					updateshipment,
				});
			}
		} else {
			return NextResponse.json({
				success: true,
				message:
					"shipment updated successfully, invalid notification parameters",
				updateshipment,
			});
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while updating the shipment",
		});
	}
}

async function sendWhatsappMessage(message, from) {
	const sendMsg = await client.messages.create({
		body: message,
		from: "whatsapp:+17744893074",
		to: `whatsapp:+263${from}`,
	});
	if (sendMsg) {
		return true;
	} else {
		return false;
	}
}
