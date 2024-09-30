import mongoose from "mongoose"

const connectdb = async() => {
    try {
        if(mongoose.connection.readyState === 0){
            await mongoose.connect(process.env.MONGODB_URI)
            console.log("db connected")
        }
        console.log("reconnected");
    }catch(error){
        console.log("database connection failed:",error)
    }
}
export default connectdb