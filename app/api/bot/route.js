import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Shipment from "@/app/models/shipment";
import { Twilio } from "twilio";
import Session from "@/app/models/session";
import Purchase from "@/app/models/purchase";

export const maxDuration = 60;

const greeting = "Hello there 👋.\nWelcome to SOKO WA platform.\n\n";
const mainmenu =
	"👉 Select an option below to get started\n\n1. 🚖🚘 View cars for sale\n2. 💸 My Purchases\n3. 🚢 Track Shipment\n4. Request Invoice";
const viewcars =
	"To visit cars for sale, please visit our website\n\nhttps://www.sokocars.com/";
const requestphone =
	"Please provide your registered phone number in the format 0773XXXXXX";
const purchasesmenu =
	"My Purchases\n1. View my purchases\n2. Back to main menu";
const invoicereq = "Please provide your full name, phone number and the nature of invoice you want (e.g. invoice for 3000 down payment)"

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function POST(request) {
	try {
		const rawBody = await request.text();
		const formData = new URLSearchParams(rawBody);
		const body = formData.get("Body");
		const from = formData.get("From");

		await connectdb();

		const session = await Session.findOne({ user: from });
		if (session) {
			switch (session.flow) {
				case "mainmenu":
					await mainMenuFlow(body, from);
					break;
				case "shipment":
					await trackShipmentFlow(body, from);
					break;
				case "purchases":
					await myPurchasesFlow(body, from, session.currentStep);
					break;
				case "invoicerequest":
					await requestInvoiceFlow(body, from, session.currentStep);
					break;
				default:
					await mainMenuFlow(body, from);
					break;
			}
		} else {
			await sendWhatsappMessage(`${greeting}\n${mainmenu}`, from);
			await Session.create({ user: from });
		}

		return NextResponse.json({
			success: true,
			message: "Transaction completed",
		});
	} catch (error) {
		console.error("Error:", error.message);
		return NextResponse.json({
			success: false,
			message: "Error processing request",
		});
	}
}

async function mainMenuFlow(body, from) {
	try {
		switch (body) {
			case "1":
				await sendWhatsappMessage(
					`${viewcars}\n\nHow else can I help you?\n${mainmenu}`,
					from
				);
				break;
			case "2":
				await updateSessionFlow(from, "purchases", 1);
				await sendWhatsappMessage(purchasesmenu, from);
				break;
			case "3":
				await updateSessionFlow(from, "shipment", 1);
				await sendWhatsappMessage(requestphone, from);
				break;
			case "4":
				await requestInvoiceFlow(from, "invoicerequest", 1);
				await sendWhatsappMessage(invoicereq, from);
				break;
			default:
				await sendWhatsappMessage(`Invalid option\n\n${mainmenu}`, from);
				break;
		}
	} catch (error) {
		console.error("Main menu flow error:", error.message);
	}
}

async function requestInvoiceFlow(body, from) {
	try {
		// Run independent async operations concurrently
		await Promise.all([
			sendAdminWhatsappMessage(`Invoice Request:\n\n ${body}`, from),
			sendWhatsappMessage(
				`Request invoice sent. Invoice will be sent to you via WhatsApp\n\nHow else can I help you?\n${mainmenu}`,
				from
			),
			updateSessionFlow(from, "mainmenu", 1),
		]);
	} catch (error) {
		console.error("Shipment tracking error:", error.message);
		// Run error handling operations concurrently
		await Promise.all([
			sendWhatsappMessage(`No shipments found for ${body}\n${mainmenu}`, from),
			updateSessionFlow(from, "mainmenu", 1),
		]);
	}
}


async function trackShipmentFlow(body, from) {
	try {
		const shipment = await Shipment.findOne({ customerphone: body });
		const update =
			shipment?.update?.at(-1) || "No updates available for this shipment";

		await sendWhatsappMessage(
			`Updates for ${body}:\n${update}\n\nHow else can I help you?\n${mainmenu}`,
			from
		);
		await updateSessionFlow(from, "mainmenu", 1);
	} catch (error) {
		console.error("Shipment tracking error:", error.message);
		await sendWhatsappMessage(
			`No shipments found for ${body}\n${mainmenu}`,
			from
		);
		await updateSessionFlow(from, "mainmenu", 1);
	}
}

async function myPurchasesFlow(body, from, currentStep) {
	try {
		if (currentStep === 1) {
			await purchasesStepOne(body, from);
		} else if (currentStep === 2) {
			await purchasesStepTwo(body, from);
		}
	} catch (error) {
		console.error("Purchases flow error:", error.message);
	}
}

async function purchasesStepOne(body, from) {
	try {
		if (body === "1") {
			await updateSessionStep(from, 2);
			await sendWhatsappMessage(requestphone, from);
		} else if (body === "2") {
			await updateSessionFlow(from, "mainmenu", 1);
			await sendWhatsappMessage(mainmenu, from);
		} else {
			await sendWhatsappMessage(`Invalid option\n\n${purchasesmenu}`, from);
		}
	} catch (error) {
		console.error("Purchases step one error:", error.message);
	}
}

async function purchasesStepTwo(body, from) {
	try {
		const purchases = await Purchase.find({ customerPhonenumber: body });

		if (purchases.length > 0) {
			await Promise.all(
				purchases.map(async (purchase) => {
					const { purchasedItem, gallery } = purchase;
					if (gallery.length > 0) {
						await Promise.all(
							gallery.map((image) =>
								sendWhatsappImage(image, purchasedItem, from)
							)
						);
					} else {
						await sendWhatsappMessage(
							`No images for ${purchasedItem}\n${mainmenu}`,
							from
						);
					}
				})
			);
			await updateSessionFlow(from, "mainmenu", 1);
		} else {
			await sendWhatsappMessage(
				`No purchases found for ${body}\n${mainmenu}`,
				from
			);
			await updateSessionFlow(from, "mainmenu", 1);
		}
	} catch (error) {
		console.error("Purchases step two error:", error.message);
	}
}

async function sendWhatsappMessage(message, from) {
	try {
		await client.messages.create({
			body: message,
			from: "whatsapp:+17744893074",
			to: from,
		});
	} catch (error) {
		console.error("Error sending WhatsApp message:", error.message);
	}
}

async function sendAdminWhatsappMessage(message, from) {
	try {
		await client.messages.create({
			body: message,
			from: "whatsapp:+17744893074",
			to: "whatsapp:+263775953491",
		});
	} catch (error) {
		console.error("Error sending WhatsApp message:", error.message);
	}
}

async function sendWhatsappImage(image, carname, from) {
	try {
		await client.messages.create({
			mediaUrl: image,
			body: carname,
			from: "whatsapp:+17744893074",
			to: from,
		});
	} catch (error) {
		console.error("Error sending WhatsApp image:", error.message);
	}
}

async function updateSessionFlow(user, flow, currentStep) {
	await Session.findOneAndUpdate({ user }, { flow, currentStep });
}

async function updateSessionStep(user, currentStep) {
	await Session.findOneAndUpdate({ user }, { currentStep });
}
