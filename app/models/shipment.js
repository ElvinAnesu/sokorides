import mongoose, { Schema } from "mongoose"

const shipmentSchema = new Schema({
    customername:{
        type: String,
        required:true
    },
    customerphone:{
        type:String,
        required:true
    },
    customeremail:{
        type: String,
    },
    purchaseditem:{
        type:String,
        required:true
    },
    origin:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    update:{
        type:[String]
    }
},{timestamps:true})

const Shipment = mongoose.models.Shipment || mongoose.model("Shipment", shipmentSchema)

export default Shipment