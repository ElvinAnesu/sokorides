import mongoose, { Schema } from "mongoose";

const leaseSchema = new Schema(
	{
		client: {
			type: Schema.Types.ObjectId, // Reference to User model
			ref: "User", // Specify the model to reference
			required: true, // Make this field required
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