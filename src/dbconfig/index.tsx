import mongoose from "mongoose";

export const Connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected Successfully!!");
    });
    connection.on("error", (error) => {
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
};