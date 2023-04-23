// pages/api/v1/quizs/quizs.js

import { User, Quiz, Paper } from "../../../../server/models/models";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../../server/utils/dbConnect";

export default async function quizHandler(req, res) {
  await connectToDatabase();

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, error: "Unauthorized." });
  }

  try {
    // 验证JWT令牌并检查用户权限
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(user.id);

    if (!userData || userData.power < 2) {
      throw new Error("You do not have permission to perform this action.");
    }

    if (req.method === "GET") {
      // 获取所有考试
      const quizs = await Quiz.find({});
      res.status(200).json({ success: true, data: quizs });
    }

    if (req.method === "POST") {
      // 创建新考试
      const newDefaultQuiz = new Quiz({
        name: "未命名",
        creator: userData.id,
        modifier: userData.id,
      });
      const newQuzi = await newDefaultQuiz.save();
      res.status(201).json({ success: true, data: newQuzi });
    }

    if(req.method = "put"){
        // 修改考试
        const { id } = req.query;
        
    }

  } catch (error) {
    // 返回错误响应
    res.status(400).json({ success: false, error: error.message });
  }
}
