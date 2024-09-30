import mongoose, { Schema } from "mongoose";

const batchSchema = new Schema(
	{
		batchName: {
			type: String,
			required: true,
		},
		shipments: [
			{
				type: String,
			},
		],
		updates: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

const Batch = mongoose.models.Batch || mongoose.model("Batch", batchSchema);

export default Batch;
