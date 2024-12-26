import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Product from "@/app/models/product"


export async function GET(request, props) {
    const params = await props.params;
    const { _id } = params
    try{
        connectdb()
        const product = await Product.findById(_id)
        if(!product){
            return NextResponse.json({
                success:false,
                message:"Failed to fetch the product"
            })
        }
        return NextResponse.json({
            success:true,
            message:"product fetched successfully",
            product
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({ 
            success:false,
            message:"Error while fetching the product"
        })
    }
}

export async function PUT(request, props) {
    const params = await props.params;
    const {_id} = params
    const {
        productname,
        price,
        currency,
        milage,
        year,
        engine,
        transmission,
        description,
        drive,
        coverimage,
        gallery,
        location,
        fuel
    } = await request.json()
    try{
        connectdb()
        const product = await Product.findByIdAndUpdate(_id,{
            productname,
            price,
            currency,
            milage,
            year,
            engine,
            transmission,
            description,
            drive,
            coverimage,
            gallery,
            location,
            fuel
        })
        if(!product){
            return NextResponse.json({
                success:false,
                message:"Error while updating the product"
            })
        }
        return NextResponse.json({
            success:true,
            message:"product updated successfully",
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Error while updating the product"
        })
    }
}

export async function DELETE(request, props) {
    const params = await props.params;
    const {_id} = params
    try{
        connectdb()
        const product = await Product.findByIdAndDelete(_id)
        if(!product){
            return NextResponse.json({
                success:false,
                message:"failed to delete product"
            })
        }
        return NextResponse.json({
            success:true,
            message:"Product deleted successfully",
        })
    }catch(error){
        return NextResponse.json({
            success:false,
            message:"Error while deleting the product"
        })
    }
}