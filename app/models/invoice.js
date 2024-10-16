import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
	{
		purchase: {
			type: Schema.Types.ObjectId, // Reference to the purchases collection
			ref: "Purchase", // The name of the model you are referencing
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
