import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import User from "@/app/models/user"

export async function POST(request) {
    const {phonenumber, password} = await request.json()
    try {
        const user = await User.findOne({phonenumber})
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not found"
            }) 
        } 
        // if(user.password !== password){
        //     return NextResponse.json({
        //         success:false,
        //         message:"Wrong passowrd"
        //     })
        // }
        return NextResponse.json({
            success:true,
            message:"Logged in Successfully"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Error loging in user"
        })
    }
}