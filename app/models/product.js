import mongoose, { Schema } from "mongoose"

const productSchema  = new Schema({ 
    productname :{
        type: String,
        required:true
    },
    price:{
        type :String,
        required:true
    },
    currency:{
        type:String,
        default:"USD"
    },
    milage:{
        type:String,
    },
    year:{
        type:String,
    },
    engine:{
        type:String,
    },
    transmission:{
        type:String,
    },
    fuel:{
        type:String,
    },
    location:{
        type:String,
    },
    description:{
        type:String,
    },
    drive:{
        type:String,
    },
    coverimage:{
        type:String,
    },
    gallery:[{
        type: String,
    }],
},{timestamps:true})

const Product = mongoose.models.Product  || mongoose.model("Product", productSchema)

export default Product 

