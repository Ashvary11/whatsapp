import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB ✅",);
  } catch (error) {
    console.log("error in connecting to DB", error);
  }
};

export default connectToDb;
