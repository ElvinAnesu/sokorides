import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
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
		},
		description: {
			type: String,
			required: true,
		},
		invoiceUrl: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Invoice =
	mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
export default Invoice;
