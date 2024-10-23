import jwt from "jsonwebtoken"; 
import { NextResponse } from "next/server"; 

const JWT_SECRET = process.env.JWT_SECRET; 

export function verifyToken(request) {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        });
    }

}
