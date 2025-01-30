import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "MONGO_URI" });

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    "mongodb+srv://a75hosseini:12345@authcluster.yvbmh.mongodb.net/?retryWrites=true&w=majority&appName=authCluster"
  );
  console.log("connected to DB");
}

export default connectDB;
