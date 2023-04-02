import mongoose, { Schema } from "mongoose";

// v1 版本 全部models
// 暂且保留user

// 用户模式
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    power: { type: Number },
    exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }], // 用户参加的考试
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

// 题目模式
const questionSchema = new Schema(
  {
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
  },
  { timestamps: true },
);

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
export const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);
