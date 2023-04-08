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

// 试卷模式
const paperSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 30 }, // 试卷名称
    category: { type: String }, // 试卷分类
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }], // 试卷包含的题目
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 试卷的创建者
    modifier: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 试卷的修改者
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }], // 参加试卷的用户
    duration: { type: Number }, // 试卷时长（分钟）
    startTime: { type: Date }, // 试卷开始时间
    endTime: { type: Date }, // 试卷结束时间
    status: { type: String }, // 试卷状态（已发布、未发布、已结束等）
  },
  { timestamps: true },
);

export const Paper =
  mongoose.models.Paper || mongoose.model("Paper", paperSchema);
