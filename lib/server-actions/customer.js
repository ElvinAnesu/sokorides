"use server";
import connectdb from "@/mongodb";
import Lease from "@/app/models/lease";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginCustomer(params, formData) {
	const phoneNumber = formData.get("phoneNumber");
	const password = formData.get("password");

    let _id;
	try {
		await connectdb();

		// Find lease by client phone number
		const lease = await Lease.findOne({
			clientPhonenumber: phoneNumber,
		});

		if (!lease) {
			return {
				success: false,
				error: "No account found with this phone number",
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
