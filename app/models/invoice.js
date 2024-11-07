import mongoose, { Schema } from "mongoose";


const invoiceSchema = new Schema(
	{
		customerId: {
			type: Schema.Types.ObjectId, // Reference to the purchases collection
			ref: "Purchase", // The name of the model you are referencing
			required: true,
		},
		customername: {
			type: String, // The name of the model you are referencing
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
		isPaid: {
			type: Boolean,
			default: false,
		},
		amount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Invoice =
	mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
export default Invoice;
