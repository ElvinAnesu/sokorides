"use server";
import connectdb from "@/mongodb";
import Lease from "@/app/models/lease";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginCustomer(params, formData) {
	const phonenumber = formData.get("phoneNumber");
	const password = formData.get("password");

    let _id;
	try {
		await connectdb();
		// Find lease by client phone number
		const lease = await Lease.findOne({
			clientPhonenumber: phonenumber,
		});
		if (!lease) {
			return {
				success: false,
				error: "No account found with this phone number",
			};
		} 
		const ismatch = password === lease.password;
		if (!ismatch) {
			return {
				success: false,
				error: "Wrong password",
			};
		}
        
        _id  = lease._id.toString()

		// Here you can add password verification if needed
		// For now, just checking phone number existence

		// If found, store the lease ID in the session or token if needed
		// ... session/token logic here if required
	} catch (error) {
		console.error("Login error:", error);
		return {
			success: false,
			error: "An error occurred during login",
		};
	}
	revalidatePath(`/clientarea/${_id}`);
	redirect(`/clientarea/${_id}`);
}

export async function registerCustomer(params, formData) {
	const phoneNumber = formData.get("phoneNumber");

	try {
		await connectdb();
		// Check if the customer exists by phone number
		const lease = await Lease.findOne({
			clientPhonenumber: phoneNumber,
		});

		if (!lease) {
			return {
				success: false,
				error: "Customer with provided phone number does not exist",
			};
		}
	} catch (error) {
		console.error("Registration error:", error);
		return {
			success: false,
			error: "An error occurred during registration",
		};
	}
	// If customer exists, redirect to set password page
	redirect(`/auth/${phoneNumber}`);
} 

export async function setPassword(formData, params) {
	const phonenumber = params.phonenumber; 
	const password = params.password
	console.log(params, formData);
	try {
		await connectdb();
		// Update the customer's password in the database
		const updatedCustomer = await Lease.findOneAndUpdate(
			{ clientPhonenumber: phonenumber },
			{ password: password }, // Make sure to hash the password before saving
			{ new: true }
		);
		if (!updatedCustomer) {
			return {
				success: false,
				error: "Failed to set password. Customer not found.",
			};
		}
	} catch (error) {
		console.error("Error setting password:", error);
		return {
			success: false,
			error: "An error occurred while setting the password.",
		};
	}
	redirect("/");
}