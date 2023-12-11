import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  console.log("trying to connect");

  if (isConnected) {
    console.log("MongoDg is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
