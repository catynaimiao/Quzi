// pages/api/v1/papers/createnew.js

import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../../server/utils/dbConnect";
import { Paper, User } from "../../../../server/models/models";

export default async function createPaper(req, res) {
  await connectToDatabase();

  if (req.method !== "GET") {
    return res
      .status(400)
      .json({ success: false, error: "Method not allowed." });
  }

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

    const papers = await Paper.find({ creator: user.id }).populate(['creator']);

    const data  = papers.map((paper) => {
        return {
            id: paper._id,
            name: paper.name,
            status: paper.status,
            questions: paper.questions,
            creator: paper.creator.name,
            startTime: paper.startTime,
            endTime: paper.endTime,
        }
    })

    // 返回成功响应
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    // 返回错误响应
    res.status(400).json({ success: false, error: error.message });
  }
}
