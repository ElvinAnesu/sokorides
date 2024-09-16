import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Shipment from "@/app/models/shipment"

export async function PUT(request) {
    const {_id, update} = await request.json()

    console.log("send values are:", _id, update)
    try {
        connectdb()
        const updateshipment = await Shipment.findByIdAndUpdate(_id,{
            $push: { update: update } },
          { new: true } //
        )
        if(!updateshipment){
            return NextResponse.json({
                success: false,
                message:"Failed to update shipment"
            }) 
        }
        return NextResponse.json({
            success: true,
            message:"shipment updated successfully",
            updateshipment
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message:"Error while updating the shipment"
        })
    }
}