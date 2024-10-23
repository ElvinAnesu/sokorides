import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
	const { phonenumber, password } = await request.json();
	try {
		await connectdb();
		const user = await User.findOne({ phonenumber });
		if (!user) {
			return NextResponse.json({
				success: false,
				message: "User not found",
			});
		}
		if (user.password !== password) {
			return NextResponse.json({
				success: false,
				message: "Wrong passowrd",
			});
		}
		// Generate a JWT token
		const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
			expiresIn: "1h",
		});
		return NextResponse.json({
			success: true,
            message: "Logged in Successfully",
            token,
			user
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error loging in user",
		});
	}
}
