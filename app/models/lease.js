import mongoose, { Schema } from "mongoose";

const leaseSchema = new Schema(
	{
		clientName: {
			type: String,
			required: true,
		},
		clientSurname: {
			type: String,
			required: true,
		},
		clientIdNo: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		clientEmail: {
			type: String,
		},
		clientPhonenumber: {
			type: String,
			required: true,
		},
		clientAddress: {
			type: String,
			required: true,
		},
		leasedCar: {
			type: String,
		},
		totalPrice: {
			type: Number,
			default: 0,
		},
		monthlyPayments: {
			type: Number,
			default: 0,
		},
		leaseTenure: {
			type: String,
		},
		downPayment: {
			type: Number,
			default: 0,
		},
		dateOfIssue: {
			type: Date,
		},
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
		documents: [{}],
	},
	{ timestamps: true }
);

const Lease = mongoose.models.Lease || mongoose.model("Lease", leaseSchema);
export default Lease;