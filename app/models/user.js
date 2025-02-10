// app/models/user.js
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		phonenumber: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			unique: true, // Ensure email is unique if provided
		},
		idnumber: {
            type: String,
            unique: true,
		},
		address: {
			type: String,
		},
		role: {
			type: String,
			enum: ["admin", "customer", "owner"], // Restrict role to specific values
			default: "customer",
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
