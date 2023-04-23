import mongoose, { Schema } from "mongoose";

// v1 版本 全部models
// 暂且保留user

// 用户模式
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    power: { type: Number },
    exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }], // 用户参加的考试
    avatar: { type: String },
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

// 试卷模式
const paperSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 30 }, // 试卷名称
    category: { type: String }, // 试卷分类
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }], // 试卷包含的题目
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 试卷的创建者
    modifier: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 试卷的修改者
    status: { type: String }, // 试卷状态（已发布、未发布）
  },
  { timestamps: true },
);

// Rename _id to id
paperSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Paper =
  mongoose.models.Paper || mongoose.model("Paper", paperSchema);

// 考试模式
const quizSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 30 },
    paper: { type: Schema.Types.ObjectId, ref: "Paper" },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    endTime: { type: Date },
    duration: { type: Number },
    status: { type: String, default: "编辑中" },
    startTime: { type: Date },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 试卷的创建者
    modifier: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 试卷的修改者
  },
  { timestamps: true },
);

quizSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

// 考试结果模式
const resultSchema = new Schema(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answers: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: { type: Number, required: true },
      },
    ],
    score: { type: Number, required: true },
  },
  { timestamps: true },
);

resultSchema.index({ quiz: 1, user: 1 }, { unique: true });

resultSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Result =
  mongoose.models.Result || mongoose.model("Result", resultSchema);

// 参加考试模式
const examSchema = new Schema(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: { type: String, default: "assigned" },
  },
  { timestamps: true },
);

examSchema.index({ quiz: 1, user: 1 }, { unique: true });

examSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);
