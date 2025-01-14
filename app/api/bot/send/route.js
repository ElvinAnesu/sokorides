import { Twilio } from "twilio";
import { NextResponse } from "next/server";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function GET(params) {
    await sendWhatsappMessage()
    return NextResponse.json({
        success: true,
        message:"hoyo"
    })
}

async function sendWhatsappMessage() {
	try {
		await client.messages.create({
			body: "hooohfdjghc",
			from: "whatsapp:+17744893074",
			to: "whatsapp:+263786388512", 
		});
	} catch (error) {
		console.error("Error sending WhatsApp message:", error.message);
	}
}
