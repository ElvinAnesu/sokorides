import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    firstname :{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"admin"
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User