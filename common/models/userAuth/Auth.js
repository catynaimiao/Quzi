import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  authHash: String,
  groupHash: String,
});

authSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.models.Auth || mongoose.model("Auth", authSchema);
