import mongoose, { Schema } from "mongoose";

const leaseSchema = new Schema({
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
	},
	monthlyPayments: {
		type: String,
	},
	leaseTenure: {
		type: String,
	},
	downPayment: {
		type: Number,
	},
	startDate: {
		type: Date,
    },
    endDate: {
        type:Date
    },
    documents: [{
        type: String,
    }],
}, { timestamps: true });

const Lease = mongoose.models.Lease || mongoose.model("Lease", leaseSchema);
export default Lease;