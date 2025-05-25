import mongoose from "mongoose";
import { DBNAME } from "../constants/constants.js";

const connectDB = async () => {
  try {
    const instance = await mongoose.connect(
      `${process.env.MONDODB_URI}/${DBNAME}`
    );
    console.log("Connected with MONGODB: ", instance.connection.host);
  } catch (error) {
    console.log("Error in connecting with DB: ", error);
    process.exit(1);
  }
};

export default connectDB;