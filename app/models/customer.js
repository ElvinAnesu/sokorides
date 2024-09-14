import mongoose, { Schema } from "mongoose"

const customerSchema = new Schema({
    surname: {
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:["firstname is required"]
    },
    phonenumber:{
        type: String,
        required: true
    },
    email:{
        type:String,
    },
    address:{
        type:String,
        required:true
    },
    purchases : {
        type: Number,
        default: 0
    },
    activeShipments: {
        type: Number,
        default: 0
    }
},{timestamps:true})

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema)

export default Customer