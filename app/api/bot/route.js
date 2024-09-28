import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Shipment from "@/app/models/shipment";
import { Twilio } from "twilio";
import Session from "@/app/models/session";
import Purchase from "@/app/models/purchase";

export const maxDuration = 60;

const greeting = "Hello there 👋.\nWelcome to SOKO WA platform.\n\n";
const mainmenu =
	"👉 Select an option below to get started\n\n1. 🚖🚘 View cars for sale\n2. 💸 My Purchases\n3. 🚢 Track Shipment";
const viewcars =
	"to visit cars for sale please visit our website\n\nhttps://www.sokocars.com/";
const requestphone =
	"Please provide your registered phone number in the format 0773XXXXXX";
const purchasesmenu =
	"My Purchases\n1. View my purchases\n2. Back to main menu";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function POST(request) {
	const rawBody = await request.text();
	const formData = new URLSearchParams(rawBody);
	const body = formData.get("Body");
	const from = formData.get("From");

	try {
		connectdb();
		const sessionExists = await Session.findOne({ user: from });
		if (sessionExists) {
			switch (sessionExists.flow) {
				case "mainmenu":
					mainMenuFlow(body, from);
					break;
				case "shipment":
					trackShipmentFlow(body, from);
					break;
				case "purchases":
					myPurchasesFlow(body, from, sessionExists.currentStep);
					break;
				default:
					mainMenuFlow(body, from);
					break;
			}
		} else {
			sendWhatsappMessage(`${greeting}\n${mainmenu}`, from);
			await Session.create({
				user: from,
			});
		}

		return NextResponse.json({
			success: true,
			message: "transaction completed",
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error sending whatsapp message",
		});
	}
}

async function mainMenuFlow(body, from) {
	switch (body) {
		case "1":
			sendWhatsappMessage(
				`${viewcars}\n\nHow else can i help you?\n${mainmenu}`,
				from
			);
			break;
		case "2":
			await Session.findOneAndUpdate(
				{ user: from },
				{ currentStep: 1, flow: "purchases" }
			);
			sendWhatsappMessage(purchasesmenu, from);
			break;
		case "3":
			await Session.findOneAndUpdate(
				{ user: from },
				{ currentStep: 1, flow: "shipment" }
			);
			sendWhatsappMessage(requestphone, from);
			break;
		default:
			sendWhatsappMessage(
				`You've selected an invalid option\n\n${mainmenu}`,
				from
			);
			break;
	}
}
async function trackShipmentFlow(body, from) {
	const shipment = await Shipment.findOne({ customerphone: body });
	if (shipment) {
		let updates = shipment.update;
		let update = updates.at(-1)
			? updates.at(-1)
			: "no updates available for shipments under";
		sendWhatsappMessage(
			`Updates for ${body}:\n${update} \n\n\nHow else can i help you?\n${mainmenu}`,
			from
		);
		await Session.findOneAndUpdate(
			{ user: from },
			{
				flow: "mainmenu",
				currentStep: 1,
			}
		);
	} else {
		sendWhatsappMessage(
			`No shipments registered  under ${body} found\n\nHow else can i help you?\n${mainmenu}`,
			from
		);
		await Session.findOneAndUpdate(
			{ user: from },
			{
				flow: "mainmenu",
				currentStep: 1,
			}
		);
	}
}
async function myPurchasesFlow(body, from, currentStep) {
	switch (currentStep) {
		case 1:
			purchasesStepOne(body, from);
			break;
		case 2:
			purchasesStepTwo(body, from);
			break;
		default:
			break;
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

async function sendWhatsappImage(image, carname, from) {
	const sendMsg = await client.messages.create({
		mediaUrl:image,
		body: carname,
		from: "whatsapp:+17744893074",
		to: from,
	});
	if (sendMsg) {
		return true;
	} else {
		return false;
	}
}

async function purchasesStepOne(body, from) {
	if (body === "1") {
		sendWhatsappMessage(requestphone, from);
		await Session.findOneAndUpdate(
			{ user: from },
			{
				currentStep: 2,
			}
		);
	} else if (body === "2") {
		await Session.findOneAndUpdate(
			{ user: from },
			{
				flow: "mainmenu",
				currentStep: 1,
			}
		);
		sendWhatsappMessage(mainmenu, from);
	} else {
		sendWhatsappMessage(
			`You've selected an invalid option\n\nSelect a valid option to proceed\n${purchasesmenu}`,
			from
		);
	}
}

async function purchasesStepTwo(body, from) {
	const mypurchases = await Purchase.find({ customerPhonenumber: body });
	const _mypurchases = mypurchases ? mypurchases : [];
	
	if (_mypurchases.length > 0) {
		for (let i = 0; i < _mypurchases.length; i++) {
			let car = _mypurchases[i]
			let carname = car.purchasedItem;
			let images = car.gallery;
			
			if (images.length > 0) {
				for (let j = 0; j < images.length; j++) {
					const _carimage = images[j];
					await sendWhatsappImage(_carimage, carname, from);
				}
			} else {
				await sendWhatsappMessage(
					`No preview images available for this purchase (${carname})\n\n${mainmenu}`,
					from
				);
			}
				
		}
		await Session.findOneAndUpdate(
			{ user: from },
			{
				flow: "mainmenu",
				currentStep: 1,
			}
		);
		await sendWhatsappMessage(`How else can i help you\n\n${mainmenu}`, from);
	} else {
		sendWhatsappMessage(
			`No purchases registered under ${body} found\nHow else can i help you\n${mainmenu}`,
			from
		);
		await Session.findOneAndUpdate(
			{ user: from },
			{
				flow: "mainmenu",
				currentStep: 1,
			}
		);
	}
}
