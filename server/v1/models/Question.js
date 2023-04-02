import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  name: { type: String, required: true, maxlength: 30 },
  options: [
    {
      id: { type: Number, required: true },
      content: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  category: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  modifier: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Rename _id to id
questionSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// Custom validation for options
questionSchema.path("options").validate((value) => {
  return value && value.length >= 2;
}, "Question must have at least two options.");

// Export model for Nextjs compatibility
const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);
module.exports = Question;
