import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://Masrad:Masrad2030@cluster0.iouq5.mongodb.net/WebDev"
    )
    .then(() => console.log("DB Connected"));
};
