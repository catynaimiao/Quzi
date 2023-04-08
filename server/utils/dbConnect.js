import mongoose from "mongoose";

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose
    .connect(process.env.MONGO_DEV_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}
