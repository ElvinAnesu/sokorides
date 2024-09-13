import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Product from "@/app/models/product"


export async function GET(request,{params}) {
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