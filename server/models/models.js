import mongoose from "mongoose";

// v1 版本 全部models

// 创建考试模式
const ExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // 考试时长（分钟）
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // 考试题目
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// 创建题目模式
const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: Number, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// 创建用户模式
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

export const Exam = mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
export const Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
