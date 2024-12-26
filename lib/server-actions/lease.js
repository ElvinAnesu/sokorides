"use server";
import connectdb from "@/mongodb";
import Lease from "@/app/models/lease";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addClientDetails(params, formData) {
	const clientName = formData.get("clientName");
	const clientSurname = formData.get("clientSurname");
	const clientIdNo = formData.get("clientIdNo");
	const clientEmail = formData.get("clientEmail");
	const clientPhonenumber = formData.get("clientPhonenumber");
	const clientAddress = formData.get("clientAddress");

	try {
		connectdb();
		const lease = await Lease.create({
			clientName,
			clientSurname,
			clientIdNo,
			clientEmail,
			clientPhonenumber,
			clientAddress,
		});
	} catch (error) {
		return { errors: { general: error.message } };
	}
	revalidatePath("/dashboard/rent-to-buy/leasedcars/createnew/details");
	redirect("/dashboard/rent-to-buy/leasedcars/createnew/details");
}
export async function addLeaseDetails(params, formData) {
	const leasedCar = formData.get("leasedCar");
	const totalPrice = formData.get("totalPrice");
	const monthlyPayments = formData.get("monthlyPayments");
	const leaseTenure = formData.get("leaseTenure");
	const startDate = formData.get("startDate");
	const endDate = formData.get("endDate");
	const downPayment = formData.get("downPayment");

	try {
		connectdb();
		const lease = await Lease.findByIdAndUpdate(_id,{
			leasedCar,
			totalPrice,
			monthlyPayments,
			leaseTenure,
			startDate,
			endDate,
			downPayment,
		});
	} catch (error) {
		return { errors: { general: error.message } };
	}
	revalidatePath("/dashboard/rent-to-buy/leasedcars/createnew/details");
	redirect("/dashboard/rent-to-buy/leasedcars/createnew/details");
}
