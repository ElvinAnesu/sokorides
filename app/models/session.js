import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
	{
		user: {
			type: String,
			required: true,
		},
		currentStep: {
			type: Number,
			default: 1,
		},
		flow: {
			type: String,
			default:"mainmenu"
		}
	},
	{ timestamps: true }
);

const Session =
	mongoose.models.Session || mongoose.model("Session", sessionSchema);
export default Session;
