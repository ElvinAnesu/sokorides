import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";

export async function POST(params) {
	const { surname, firstname, phonenumber, role, password } =
		await params.json();

	console.log(phonenumber);

	try {
		await connectdb();
		const user = await User.create({
			surname,
			firstname,
			phonenumber,
			role,
			password,
		});

		if (!user) {
			return NextResponse.json({
				success: false,
				message: "failed to create user",
			});
		}
		return NextResponse.json({
			success: true,
			message: "user created successfully",
			user,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Error while creating user",
		});
	}
}

export async function GET(request,{params}) {
	try {
		await connectdb();
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page"), 10) || 1;
		const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;

		const totalUsers = await User.countDocuments();
		const users = await User.find()
			.sort({ _id: -1 })
			.skip((page - 1) * pageSize)
			.limit(pageSize);

		if (!users) {
			return NextResponse.json({
				success: false,
				message: "failed to fetch users",
			});
		}

		return NextResponse.json({
			success: true,
            message: "users fetched successfully",
            totalUsers,
			users,
		});
	} catch (error) {
		console.log("Error: ",error.message);
		return NextResponse.json({
			success: true,
			message: "Error while fetching users",
		});
	}
}
