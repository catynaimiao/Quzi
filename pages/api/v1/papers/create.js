// pages/api/papers/v1/create.js

import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../../server/utils/dbConnect";
import { Paper, User } from "../../../../server/models/models";

export default async function createPaper(req, res) {
  await connectToDatabase();

  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ success: false, error: "Method not allowed." });
  }

  // 获取Authorization头和请求体
  const authHeader = req.headers.authorization;
  const { name, category, questions, duration, startTime, endTime, status } =
    req.body;

  try {
    // 验证JWT令牌并检查用户权限
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(user.id);
    if (!userData || userData.power < 2) {
      throw new Error("You do not have permission to perform this action.");
    }

    // 创建试卷
    const paper = new Paper({
      name,
      category,
      questions,
      creator: user.id,
      modifier: user.id,
      duration,
      startTime,
      endTime,
      status,
    });
    await paper.save();

    // 返回成功响应
    res.status(200).json({ success: true, data: paper });
  } catch (error) {
    // 返回错误响应
    res.status(400).json({ success: false, error: error.message });
  }
}
