import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "MONGO_URI" });

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("connected to DB");
}

export default connectDB;
