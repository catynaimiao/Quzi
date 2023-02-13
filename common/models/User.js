import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [6, "用户名最小长度为6"],
  },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true, minLength: [2, "姓名最小长度为2"] },
  phone: { type: String, minLength: [11, "电话最小长度为 11位"] },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
