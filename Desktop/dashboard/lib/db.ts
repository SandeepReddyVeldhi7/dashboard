import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string
console.log("mon",MONGODB_URI)
export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return

  return mongoose.connect(MONGODB_URI)
}