import mongoose from "mongoose"

// not a good way need to war it in a method with try cathc 
// mongoose.connect(process.env.MONGO_URI)



const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo Connected");

    }catch(error){
        console.error("MongoDB connection error",error);
        process.exit(1);
    }
}
export default connectDB;