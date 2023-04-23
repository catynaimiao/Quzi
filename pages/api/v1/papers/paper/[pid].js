// pages/api/v1/papers/paper/[pid].js

import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../../../server/utils/dbConnect";
import { Paper, User } from "../../../../../server/models/models";

export default async function handler(req, res) {
  const { pid } = req.query;

  await connectToDatabase();

  // 获取Authorization头和请求体
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
      const paper = await Paper.findById(pid).populate([
        "creator",
        "questions",
      ]);

      const data = {
        id: paper._id,
        name: paper.name,
        status: paper.status,
        category: paper.category,
        questions: paper.questions.map((question) => {
          return {
            id: question._id,
            name: question.name,
            options: question.options,
            category: question.category,
          };
        }),
        creator: paper.creator.name,
      };

      // 返回成功响应
      res.status(200).json({ success: true, data: data });
    }

    if (req.method === "PUT") {
      await Paper.findByIdAndUpdate(pid, req.body);
      const response = await Paper.findById(pid).populate("questions");

      res.status(200).json({ success: true, data: response });
    }

    if (req.method === "DELETE") {
      await Paper.findByIdAndDelete(pid);
      res.status(200).json({ success: true, data: "this is delete" });
    }

    if (req.method === "POST") {
      res.status(200).json({ success: true, data: "this is post" });
    }
  } catch (error) {
    // 返回错误响应
    res.status(400).json({ success: false, error: error.message });
  }
}
