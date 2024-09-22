import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Payment =
	mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
