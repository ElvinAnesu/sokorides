import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Customer from "@/app/models/customer"


export async function GET(request, {params}) {
    const {_id} = await params
    try{
        connectdb()
        const customer = await Customer.findById(_id)
        if(!customer){
            return NextResponse.json({
                success:false,
                message:"Failed to fetch the customer"
            })
        }
        return NextResponse.json({
            success:true,
            message:"Customer fetched successfully",
            customer
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Error while fetching the customer"
        })
    }
}

export async function PUT(request,{params}) {
    const {_id} = params
    const {surname,firstname,phonenumber,email} = await request.json()
    try {
        connectdb()
        const updateCustomer = await Customer.findByIdAndUpdate(_id,{
            surname,
            firstname,
            phonenumber,
            email
        })
        if(!updateCustomer){
            return NextResponse.json({
                success:false,
                message:"Failed to update customer"
            })
        }
        return NextResponse.json({
            success:true,
            message:"Customer updated successfully"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Error while updating the customer"
        })
    }
}

export async function DELETE(request,{params}) {
    const {_id} = params
    try {
        connectdb()
        const deleteCustmer = await Customer.findByIdAndDelete(_id)
        if(!deleteCustmer){
            return NextResponse.json({
                success:false,
                message:"Failed to delete customer"
            })
        }
        return NextResponse.json({
            success:true,
            message:"Customer successfully deleted"
        })
    } catch (error) {
        console.log(error)
        NextResponse.json({
            success:false,
            message:"Error while deleting customer"
        })
    }
}