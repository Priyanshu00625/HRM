import mongoose from "mongoose"
import express from "express"


const connectDB = async()=>{
 try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n MongoDB connected !! DB HOST: ${response.connection.host}`);
 } catch (error) {
     console.log("MONGODB connection FAILED ", error);
        process.exit(1)
 }
}

export default connectDB;