import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Batch from "@/app/models/batch";
import Shipment from "@/app/models/shipment";
import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function PUT(request) {
	try {
        
		const { _id, update } = await request.json();
		await connectdb();
		// Update batch with new updates
		const updatedBatch = await Batch.findByIdAndUpdate(
			_id,
			{ $push: { updates: update } },
		);
		if (!updatedBatch) {
			return NextResponse.json({
				success: false,
				message: "Batch not found or failed to update",
			});
		}
		const shipments = updatedBatch.shipments || [];
		// Send updates for all shipments in parallel
		const shipmentUpdates = shipments.map(async (shipment) => {
			const updatedShipment = await Shipment.findByIdAndUpdate(
				shipment,
				{ $push: { update } },
			);

			if (updatedShipment) {
				const receiver = updatedShipment.customerphone?.slice(1);
				if (receiver) {
					const notificationSent = await sendWhatsappMessage(update, receiver);
					return { success: notificationSent, shipment: updatedShipment };
				}
			}

			return { success: false, shipment: updatedShipment };
		});

		const results = await Promise.all(shipmentUpdates);

		// Check for any failed notifications
		const failedUpdates = results.filter((result) => !result.success);

		if (failedUpdates.length > 0) {
			return NextResponse.json({
				success: true,
				message: "Shipment(s) updated, but some notifications failed to send",
				failedUpdates,
			});
		}

		return NextResponse.json({
			success: true,
			message: "All shipments updated and notifications sent successfully",
			results,
		});
	} catch (error) {
		console.error("Error while updating shipment:", error);
		return NextResponse.json({
			success: false,
			message: "Error while updating the shipment",
		});
	}
}

async function sendWhatsappMessage(message, receiver) {
	try {
		await client.messages.create({
			body: message,
			from: "whatsapp:+17744893074",
			to: `whatsapp:+263${receiver}`,
		});
		return true;
	} catch (error) {
		console.error("Failed to send WhatsApp message:", error);
		return false;
	}
}
