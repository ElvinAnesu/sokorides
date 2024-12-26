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
	const leasedCar = formData.get("leasedCar");
	const totalPrice = formData.get("totalPrice");
	const monthlyPayments = formData.get("monthlyPayments");
	const downPayment = formData.get("downPayment");

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
export async function addLeaseDocuments(_id, _documents) {
	try {
		await connectdb();
		// Find the lease and update by pushing new documents to the documents array
		const lease = await Lease.findByIdAndUpdate(
			_id,
			{
				$push: {
					documents: {
						$each: _documents,
					},
				},
			},
			{ new: true } // Return the updated document
		);

		if (!lease) {
			throw new Error("Lease not found");
		}
		console.log(lease);
	} catch (error) {
		console.error("Error adding documents:", error);
		return { errors: { general: error.message } };
	}
	revalidatePath(`/dashboard/rent-to-buy/leasedcars/${_id._id}`);
	redirect(`/dashboard/rent-to-buy/leasedcars/${_id._id}`);
}

export async function getPaginatedLeases(params) {
    
    try {
        connectdb() 
        const leases = await Lease.find() 
        const _leases = leases.map((lease) => ({
            ...lease.toObject(),
            _id:lease._id.toString()
        }))
        return _leases;
    } catch (error) {
        console.log(error.message)
    }
} 

export async function getLeaseById(_id) {
    try {
        connectdb()
        const lease = await Lease.findById(_id)
        const _lease = lease.toObject()
        _lease._id = _lease._id.toString()
        return _lease;
    } catch (error) {
        console.log(error.message)
    }
} 

export async function updateDownPayment(_id, amount) {
	try {
		await connectdb();
		const lease = await Lease.findByIdAndUpdate(
			_id,
			{
				$inc: { 
					downPayment: Number(amount) 
				}
			},
			{ new: true } // Return the updated document
		);
		if (!lease) {
			throw new Error("Lease not found");
		}
	} catch (error) {
		console.error("Error updating down payment:", error);
		return { errors: { general: error.message } };
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