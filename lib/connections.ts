import mongoose from "mongoose";

const dbUri = process.env.DB_URI as string;
let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("DB connection already established");
    return;
  }
  try {
    await mongoose.connect(dbUri);
    isConnected = true;
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
