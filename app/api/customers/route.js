import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Customer from "@/app/models/customer"
import User from "@/app/models/user"


export async function POST(request) {
    
    const {
        surname,
        firstname,
        phonenumber,
        email,
        address
    } = await request.json()

    try{
        connectdb()
        const customer = await Customer.create({
            surname,
            firstname,
            phonenumber,
            email,
            address
        })

        if(!customer){
            return NextResponse.json({
                success:false,
                message:"failed to create customers"
            })
        }

        return NextResponse.json({
            success:true,
            message:"customer created successfully"
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message:"Error while creating the customer"
        })
    }
}

export async function GET(request,{params}) {
    const {searchParams} = new URL(request.url)
    const page = parseInt(searchParams.get("page")) || 1
    const pageSize = parseInt(searchParams.get("pageSize")) || 10
    const searchQuery = searchParams.get("searchQuery") || null

    const query = searchQuery != "null" && searchQuery != null
    ?  {
          $and: [
            {
              $or: [
                { surname: { $regex: new RegExp(searchQuery, 'i') } }, 
                { firstname: { $regex: new RegExp(searchQuery, 'i') } },
              ]
            }
          ]
        }
    : {}

    try{
        connectdb()
        const totalCustomers = await Customer.countDocuments(query)
        const customers = await Customer.find(query).skip((page-1)*pageSize).limit(pageSize)

        if(!customers){
            return NextResponse.json({
                success:false,
                message:"Failed to fetch customers"
            })
        }

        return NextResponse.json({
            success:true,
            message:"Customers fetched successfully",
            totalCustomers,
            customers
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Error while fetching customers"
        })
    }
}

export async function GET_ALL() {
    try {
        await connectdb();
        const customers = await User.find({ role: 'customer' })
            .select('firstname surname idNumber phonenumber address _id');
        
        // Convert _id to string for each customer
        const _customers = customers.map(customer => ({
            ...customer.toObject(),
            _id: customer._id.toString()
        }));

        return NextResponse.json({ customers: _customers });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}