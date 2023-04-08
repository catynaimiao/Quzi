// pages/api/papers/v1/update-status.js

import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../../server/utils/dbConnect";
import { Paper, User } from "../../../../server/models/models";

export default async function updateStatus(req, res) {
  await connectToDatabase();

  if (req.method !== "PUT") {
    return res
      .status(400)
      .json({ success: false, error: "Method not allowed." });
  }
  
  // 获取Authorization头和请求参数
  const authHeader = req.headers.authorization;
  const { paperId, status } = req.body;

  try {
    // 验证JWT令牌并检查用户权限
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(user.id);
    if (!userData || userData.power < 2) {
      throw new Error("You do not have permission to perform this action.");
    }

    // 更新试卷的状态
    const paper = await Paper.findByIdAndUpdate(
      paperId,
      { status, modifier: user.id },
      { new: true },
    );

    // 如果试卷不存在，则抛出错误
    if (!paper) {
      throw new Error("Paper not found.");
    }

    // 返回成功响应
    res.status(200).json({ success: true, data: paper });
  } catch (error) {
    // 返回错误响应
    res.status(400).json({ success: false, error: error.message });
  }
}
