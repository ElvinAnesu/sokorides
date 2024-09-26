import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Shipment from "@/app/models/shipment";
import { Twilio } from "twilio";
import Session from "@/app/models/session";

const greeting =
	"Hello there 👋.\nWelcome to SOKO WA platform.\n\n👉 Select an option below to get started\n\n";
const mainmenu =
	"1. 🚖🚘 View cars for sale\n2. 💸 My Purchases\n3. 🚢 Track Shipment";
const viewcars =
	"to visit cars for sale please visit our website\n\nhttps://sokorides.vercel.app";
const invalidoption = "Invalid option. Select a valid option to proceed";
const requestphone =
	"Please provide your registered phone number in the format 0773XXXXXX";
const shipmennotfound = "No shipment registerd under this phonenumber found";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function POST(request) {

	const rawBody = await request.text();
	const formData = new URLSearchParams(rawBody);
	const body = formData.get("Body");
	const from = formData.get("From");
	let msgSend = false;

	try {
		connectdb();
		const sessionExists = await Session.findOne({ user: from });
		if (sessionExists) {
		} else {
			msgSend = sendWhatsappMessage(`${greeting}\n${mainmenu}`, from);
			await Session.create({
				user: from,
			});
		}

		return NextResponse.json({
			success: true,
			message: "transaction completed",
			msgSend
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error sending whatsapp message",
		});
	}
}

async function sendWhatsappMessage(message, from) {
	const sendMsg = await client.messages.create({
		body: message,
		from: "whatsapp:+17744893074",
		to: from,
	});
	if (sendMsg) {
		return true;
	} else {
		return false;
	}
}
