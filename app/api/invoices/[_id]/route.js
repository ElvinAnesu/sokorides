import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Invoice from "@/app/models/invoice";

export async function DELETE(request,{params}) {
    const { _id } = params;
    try {
        connectdb()
        const deletInvoice = await Invoice.findByIdAndDelete(_id)
        if (!deletInvoice) {
            return NextResponse.json({
                success: true,
                message:"Invoice not found"
            })
        }
        return NextResponse.json({
            success: true,
            message:"Invoice successfully deleted"
        })
    } catch (error) {
        console.log("Error: ", error.message)
        return NextResponse.json({
            success: true,
            message: "Error while deleting invoice"
        })
    }
}