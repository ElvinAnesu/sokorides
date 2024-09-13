import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Product from "@/app/models/product"

export const dynamic = 'force-dynamic'

//create new product
export async function POST(request) {
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
        const newproduct = await Product.create({
            productname,
            price,
            currency,
            milage,
            fuel,
            year,
            engine,
            transmission,
            description,
            drive,
            coverimage,
            gallery,
            location
        })

        if(!newproduct){
            return NextResponse.json({ 
                success:false,
                message:"failed to create product"
            })
        }

        return NextResponse.json({ 
            success:true,
            message:"Product created successfully",
            newproduct
        })
    }catch(error){
        console.log()
        return NextResponse.json({ 
            success:false,
            message:"Error while creating the product"
        })
    }
}

//get all products with pagination
export async function GET(request,{params}) {
    const {searchParams} = new URL(request.url)
    const page = parseInt(searchParams.get("page")) || 1
    const pageSize = parseInt(searchParams.get("pageSize")) || 10
    const searchQuery = searchParams.get("searchQuery")

    const query = searchQuery != "null" && searchQuery != null
      ?  {
            $and: [
              {
                $or: [
                  { productname: { $regex: new RegExp(searchQuery, 'i') } }, 
                  { description: { $regex: new RegExp(searchQuery, 'i') } },
                ]
              }
            ]
          }
      : {}

    try{
        connectdb()
        const totalProducts = await Product.countDocuments(query)
        const products = await Product.find(query).skip((page-1)*pageSize).limit(pageSize)

        if(!products){
            return NextResponse.json({
                success: false,
                message:"failed to fetch products",
            })
        }

        return NextResponse.json({
            success:true,
            message:"products fetched successfully",
            total:totalProducts,
            page,
            pageSize,
            products,
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Error while fetching the products",
            error
        })
    }
}