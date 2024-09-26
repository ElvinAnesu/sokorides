import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
	{
		customerName: {
			type: String,
			required: true,
		},
		customerId: {
			type: String,
			required: true,
		},
		purchasedItem: {
			type: String,
			required: true,
		},
		vehicleStatus: {
			type: String,
			required: true,
		},
		totalPrice: {
			type: Number,
			required: true,
		},
		currentPayment: {
			type: Number,
			required: true,
		},
		gallery: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

const Purchase =
	mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);

export default Purchase;
