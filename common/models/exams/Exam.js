import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  description: String,
  questions: [
    {
      id: String,
      question: String,
      options: [{ id: String, option: String, answer: String }],
    },
  ],
  answers: [String],
});

examSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.models.Exam || mongoose.model("Exam", examSchema);
