import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import User from "@/app/models/user"


export async function POST(params) {
    const {
        surname,
        firstname,
        phonenumber,
        role,
        password
    } = await params.json()

    console.log(phonenumber)

    try {
        const user = await User.create({
            surname,
            firstname,
            phonenumber,
            role,
            password
        })
    
        if(!user){
            return  NextResponse.json({
                success:false,
                message:"failed to create user"
            })
        }
        return NextResponse.json({
            success: true,
            message: "user created successfully",
            user
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Error while creating user"
        })
    }
}

export async function GET(params) {
    try{
        const users = await User.find()
        if(!users){
            return NextResponse.json({
                success: false,
                message: "failed to fetch users"
            })
        }

        return NextResponse.json({
            success:true,
            message:"users fetched successfully",
            users
        })

    }catch(error){
        return NextResponse.json({
            success:true,
            message: "Error while fetching users"
        })
    }
}