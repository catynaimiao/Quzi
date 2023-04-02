import mongoose from "mongoose";

// v1 版本 全部models
// 暂且保留user


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

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
