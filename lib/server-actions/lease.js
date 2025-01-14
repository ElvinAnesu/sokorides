"use server";
import connectdb from "@/mongodb";
import Lease from "@/app/models/lease";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Payment from "@/app/models/payment";

export async function addClientDetails(params, formData) {
	const clientName = formData.get("clientName");
	const clientSurname = formData.get("clientSurname");
	const clientIdNo = formData.get("clientIdNo");
	const clientEmail = formData.get("clientEmail");
	const clientPhonenumber = formData.get("clientPhonenumber");
	const clientAddress = formData.get("clientAddress");
	const leasedCar = formData.get("leasedCar");
	const totalPrice = Number(formData.get("totalPrice"));
	const monthlyPayments = Number(formData.get("monthlyPayments"));
	const downPayment = Number(formData.get("downPayment"));
	const dateOfIssue = formData.get("dateOfIssue");

	//form validations
	if (monthlyPayments > totalPrice) {
		return {
			errors: {
				monthlyPayments:
					`Monthly payments of ${monthlyPayments}  cannot be greater than the total price. of ${monthlyPayments}`,
			},
		};
	}
	if (downPayment > totalPrice) {
		return {
			errors: {
				downPayment: `Down payment of ${downPayment} cannot be greater than the total price. ${totalPrice}`,
			},
		};
	} 
	const balance = totalPrice - downPayment;
	if (monthlyPayments > balance) {
		return {
			errors: {
				monthlyPayments: `Monthly payments of ${monthlyPayments} cannot be greater than outstanding balance of ${balance}.`,
			},
		};
	}

	let _id;
	try {
		connectdb();
		const lease = await Lease.create({
			clientName,
			clientSurname,
			clientIdNo,
			clientEmail,
			clientPhonenumber,
			clientAddress,
			leasedCar,
			totalPrice,
			monthlyPayments,
			downPayment,
			dateOfIssue
		});
		_id = lease._id;
	} catch (error) {
		return { errors: { general: error.message } };
	}
	revalidatePath(
		`/dashboard/rent-to-buy/leasedcars/createnew/${_id}/documents`
	);
	redirect(`/dashboard/rent-to-buy/leasedcars/createnew/${_id}/documents`);
}
export async function addLeaseDocuments(_id, documentUrl, documentType) {
	try {
		await connectdb();

		const lease = await Lease.findByIdAndUpdate(
			_id,
			{
				$push: {
					documents: {
						url: documentUrl,
						type: documentType,
					},
				},
			},
			{ new: true }
		);

		if (!lease) {
			throw new Error("Lease not found");
		}
	} catch (error) {
		console.error("Error adding documents:", error);
		return { errors: { general: error.message } };
	}

	revalidatePath(`/dashboard/rent-to-buy/leasedcars/${_id._id}`);
	redirect(`/dashboard/rent-to-buy/leasedcars/${_id._id}`);
}
export async function getPaginatedLeases(params) {
	try {
		connectdb();
		const leases = await Lease.find();
		const _leases = leases.map((lease) => ({
			...lease.toObject(),
			_id: lease._id.toString(),
		}));
		return _leases;
	} catch (error) {
		console.log(error.message);
	}
}
export async function getLeaseById(_id) {
	try {
		connectdb();
		const lease = await Lease.findById(_id);
		const _lease = lease.toObject();
		_lease._id = _lease._id.toString();
		return _lease;
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function updateDownPayment(
	_id,
	amount,
	fullname,
	date,
	description,
	paymentMethod
) {
	try {
		await connectdb(); 
		// record payment first 
		const payment = await Payment.create({
			fullname,
			date,
			amount,
			description,
			paymentMethod,
		});

		if (!payment) {
			return { errors: { general: "failed to record payment" } };
		} 

		const lease = await Lease.findByIdAndUpdate(
			_id,
			{
				$inc: {
					downPayment: Number(amount),
				},
			},
			{ new: true } // Return the updated document
		);
		if (!lease) {
			throw new Error("Lease not found");
		}
	} catch (error) {
		throw new Error(error.message);
		
	}

	revalidatePath(`/dashboard/rent-to-buy/leasedcars/${_id}`);
	redirect(`/dashboard/rent-to-buy/leasedcars/${_id}`);
}
export async function getLatestLeases(params) {
	try {
		await connectdb();
		const leases = await Lease.find()
			.sort({ createdAt: -1 }) // Sort by creation date in descending order
			.limit(3); // Limit to 3 documents

		const _leases = leases.map((lease) => ({
			...lease.toObject(),
			_id: lease._id.toString(),
		}));
		return _leases;
	} catch (error) {
		console.log(error.message);
		return []; // Return empty array in case of error
	}
}
export async function deleteLease(_id) {
	try {
		connectdb();
		await Lease.findByIdAndDelete(_id);
		console.log("deleted");
	} catch (error) {
		throw new Error(`Failed to delete lease with ID : ${error.message}`);
	}
	revalidatePath("/dashboard/rent-to-buy");
	redirect("/dashboard/rent-to-buy");
}
export async function updateClientDetails(params, formData) {
	const _id = formData.get("_id");
	const clientName = formData.get("clientName");
	const clientSurname = formData.get("clientSurname");
	const clientIdNo = formData.get("clientIdNo");
	const clientEmail = formData.get("clientEmail");
	const clientPhonenumber = formData.get("clientPhonenumber");
	const clientAddress = formData.get("clientAddress");
	const leasedCar = formData.get("leasedCar");
	const totalPrice = formData.get("totalPrice");
	const monthlyPayments = formData.get("monthlyPayments");
	const downPayment = formData.get("downPayment");

	try {
		await connectdb();
		const updated = await Lease.findByIdAndUpdate(
			_id,
			{
				clientName,
				clientSurname,
				clientIdNo,
				clientEmail,
				clientPhonenumber,
				clientAddress,
				leasedCar,
				totalPrice,
				monthlyPayments,
				downPayment,
			},
			{ new: true } // This option returns the updated document
		);

		if (!updated) {
			throw new Error("Failed to update lease");
		}

		console.log("Updated lease:", updated);
		return { success: true, message: "Details updated successfully" };
	} catch (error) {
		throw new Error(error.message);
	}
}
export async function deleteLeaseDocument(leaseId, doc) {
	try {
		await connectdb();
		const lease = await Lease.findByIdAndUpdate(
			leaseId,
			{
				$pull: {
					documents: doc,
				},
			},
			{ new: true }
		);

		if (!lease) {
			throw new Error("Lease not found");
		}

		revalidatePath(`/dashboard/rent-to-buy/leasedcars/${leaseId}`);
		return { success: true, message: "Document deleted successfully" };
	} catch (error) {
		console.error("Error deleting document:", error);
		return { success: false, error: error.message };
	}
}
