import mongoose from "mongoose";

export const connectDb = async()=> {
  try {
     const conn  = await mongoose.connect(process.env.MONGODB_URL)
     console.log(`Mongodb Connected : ${conn.connection.host}`)
  } catch (error) {
    console.log("Error in Connecting MongoDb",error.message)
    process.exit(1)
    
  }
}