import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Shipment from "@/app/models/shipment"

export async function GET(request,{params}) {
    const {_id} = params
    try {
        connectdb()
        const shipment = await Shipment.findById(_id)
        if(!shipment){
            return NextResponse.json({
                success:false,
                message:"Shipment not found"
            })
        }
        return NextResponse.json({
            success:true,
            message:"Shipment fetched succesfully",
            shipment
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: true,
            message:"Error while fetching the shipment"
        })
    }
}
export async function PUT(request,{params}) {
    const {_id} = params
    const {
        customername,
        customerphone,
        customeremail,
        purchaseditem,
        origin,
        destination,
        update,
        price
    } = await request.json()
    try{
        connectdb()
        const updateshipment = await Shipment.findByIdAndUpdate(_id,{
            customername,
            customerphone,
            customeremail,
            purchaseditem,
            origin,
            destination,
            update,
            price
        })
        if(!updateshipment){
            return NextResponse.json({
                success:false,
                message:"Failed to update the shipment"
            })
        }
        return NextResponse.json({
            success:true,
            message:"updates successfully"
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Error while updating  shipment"
        })
    }
}
export async function DELETE(request,{params}) {
    const {_id} = await params
    try{
        connectdb()
        const deleteshipment = await Shipment.findByIdAndDelete(_id)
        if(!deleteshipment){
            return NextResponse.json({
                success:false,
                message:"failed to delete shipment"
            })
        }
        return NextResponse.json({
            success:true,
            message:"Shipment deleted successfully"
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Error while deleting shipment"
        })
    }
}