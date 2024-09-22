import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import Shipment from "@/app/models/shipment";
import { Twilio } from "twilio";
import Session from "@/app/models/session";

const greeting = "Hello there, How can i help you today";
const mainmenu = "1. Track my shipment\n2. View cars for sale";
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

	console.log("the body is:", body);
	try {
		connectdb();
		//check is session exixts
		const sessionExists = await Session.findOne({ user: from });
		if (sessionExists) {
			//check currentStep
			if (sessionExists.currentStep === 0) {
				const nextStep = await Session.findOneAndUpdate(
					{ user: from },
					{ currentStep: 1 }
				);
				if (nextStep) {
					const reply = sendWhatsappMessage(`${greeting}\n${mainmenu}`, from);
					if (reply) {
						console.log("message sent successfully");
						return NextResponse.json({
							success: true,
							message: "message sent succesfully",
						});
					} else {
						console.log("failed to send message");
						return NextResponse.json({
							success: false,
							message: "failed to send message",
						});
					}
				} else {
					console.log("failed to update session");
					return NextResponse.json({
						success: false,
						message: "failed to update session",
					});
				}
			} else if (sessionExists.currentStep === 1) {
				if (body === "1") {
					const nextStep = await Session.findOneAndUpdate(
						{ user: from },
						{ currentStep: 2 }
					);
					if (nextStep) {
						const reply = sendWhatsappMessage(requestphone, from);
						if (reply) {
							console.log("message sent successfully");
							return NextResponse.json({
								success: true,
								message: "message sent successfully",
							});
						} else {
							console.log("message not sent");
							return NextResponse.json({
								success: false,
								message: "failed to send message",
							});
						}
					} else {
						console.log("failed to update session");
						return NextResponse.json({
							success: false,
							message: "failed to update session",
						});
					}
				} else if (body === "2") {
					const session = await Session.findOneAndUpdate(
						{ user: from },
						{ currentStep: 0 }
					);
					if (session) {
						const reply = sendWhatsappMessage(viewcars, from);
						if (reply) {
							console.log("reply send successfully");
							return NextResponse.json({
								success: true,
								message: "message sent successfully",
							});
						} else {
							console.log("reply send successfully");
							return NextResponse.json({
								success: false,
								message: "failed to send message",
							});
						}
					} else {
						console.log("failed to update session");
						return NextResponse.json({
							success: false,
							message: "failed to update session",
						});
					}
				} else {
					const reply = sendWhatsappMessage(invalidoption, from);
					if (reply) {
						console.log("reply send successfully");
						return NextResponse.json({
							success: true,
							message: "message sent successfully",
						});
					} else {
						console.log("reply send successfully");
						return NextResponse.json({
							success: false,
							message: "failed to send message",
						});
					}
				}
			} else if (sessionExists.currentStep === 2) {
				//give response and return to step 1
				const shipment = await Shipment.findOne({ customerphone: body });
				if (shipment) {
					const session = await Session.findOneAndUpdate(
						{ user: from },
						{ currentStep: 0 }
					);
                    if (session) {
                        const updates = shipment.update
                        const _update = updates.at(-1)? updates.at(-1) :"no updates available for this number"
						const reply = sendWhatsappMessage(_update , from);
						if (reply) {
							console.log("message sent successfully");
							return NextResponse.json({
								success: true,
								message: "message sent successfully",
							});
						} else {
							console.log("message not sent");
							return NextResponse.json({
								success: false,
								message: "message not sent",
							});
						}
					} else {
						console.log("message not sent");
						return NextResponse.json({
							success: false,
							message: "message not sent",
						});
					}
				} else {
					const session = await Session.findOneAndUpdate(
						{ user: from },
						{ currentStep: 0 }
					);
					if (session) {
						const reply = sendWhatsappMessage(shipmennotfound, from);
						if (reply) {
							console.log("message sent successfully");
							return NextResponse.json({
								success: true,
								message: "message sent successfully",
							});
						} else {
							console.log("message not sent");
							return NextResponse.json({
								success: false,
								message: "message not sent",
							});
						}
					} else {
						console.log("failed to update session");
						return NextResponse.json({
							success: false,
							message: "failed to update session",
						});
					}
				}
			}
		} else {
			//create session
			const session = await Session.create({
				user: from,
			});
			if (!session) {
				console.log("failed to create session");
				return NextResponse.json({
					success: false,
					message: "failed to create session",
				});
			}
			const reply = sendWhatsappMessage(`${greeting}\n${mainmenu}`, from);
			if (reply) {
				console.log("message sent successfully");
				return NextResponse.json({
					success: true,
					message: "message sent succesfully",
				});
			} else {
				console.log("failed to send message");
				return NextResponse.json({
					success: false,
					message: "failed to send message",
				});
			}
		}

		return NextResponse.json({
			success: true,
			message: "WhatsApp message sent successfully",
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
