import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  category: String,
  description: String,
  questions: [
    {
      id: String,
      type: String,
      question: String,
      options: [{ id: String, option: String }],
      answer: String,
    },
  ],
});

paperSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.models.Paper || mongoose.model("Paper", paperSchema);
