import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import User from "@/app/models/user"

export async function GET(request,{params}) {
    const {_id} = params
    try{
        const user = await User.findById(_id)
        if(!user){
            return NextResponse.json({
                success:false,
                message:"Failed to fetch the user"
            })
        }

        return NextResponse.json({
            success:true,
            message:"user fetched successfully",
            user
        })
    }catch(error){
        return NextResponse.json({
            success: false,
            message:"Error while fetching the user"
        })
    }
}
export async function PUT(request,{params}) {
    const {_id} = params
    const {
        surname,
        firstname,
        phonenumber,
        role
    } = await request.json()
    try{
        connectdb()
        const updateuser = await User.findByIdAndUpdate(_id,{
            surname,
            firstname,
            phonenumber,
            role
        })
        if(!updateuser){
            return NextResponse.json({
                success:false,
                message:"Failed to update the user"
            })
        }
        return NextResponse.json({
            success:true,
            message:"user updated successfully"
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Error while updating the user"
        })
    }
}
export async function DELETE(request,{params}) {
    const {_id} = params
    try {
        const deleteuser = await User.findByIdAndDelete(_id)
        if(!deleteuser){
            return NextResponse.json({
                success:false,
                message:"Failed to delete the user"
            })
        } 
        return NextResponse.json({
            success:true,
            message:"User deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Error while deleting user"
        })
    }
}