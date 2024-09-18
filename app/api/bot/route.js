import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import User from "@/app/models/user"
import Shipment from "@/app/models/shipment"

const greeting = "Hello there, How can i help you today"
const mainmenu = "1. Track my shipment\n2. View cars for sale\n3. Rent to buy"


export async function POST(request) {
    const { from, text } = await request.json();
    console.log(from, text)
    try{

        const apiUrl = "https://messages-sandbox.nexmo.com/v1/messages "
        const apiKey = "bb9a74da"
        const apiSecret = "PrGcjjDDYd2039ri"

        let responseMsg = "Default";

        if(text === "hi" || text === "hello"){
            responseMsg = `${greeting}\n${mainmenu}`
        }else if(text == "2"){
            responseMsg = "to visit cars for sale please visit our website\n\nhttps://sokorides.vercel.app"
        }else if(text == "1"){
            responseMsg = "to your car has arrived in harare"
        }
        //send message
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64"),
            },
            body: JSON.stringify({
                from: "14157386102",       // e.g., "14157386102"
                to: from,           // e.g., "263775953491"
                message_type: "text",
                text: responseMsg,
                channel: "whatsapp",
            }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        // Parse the response body
        const data = await response.json();

        return NextResponse.json({
            success: true,
            message: "WhatsApp message sent successfully",
            data,
        })
        
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message:"Error sending whatsapp message"
        })
    }
}