import { User } from "../models/models";
import jwt from "jsonwebtoken";
import dbConnect from "../utils/dbConnect";

// 定义 JWT 验证中间件
export const withAuth = (handler) => async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    return handler(req, res);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const withPower = (handler, power) => async (req, res) => {
  await dbConnect();
  try {
    const { user } = req;
    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return res.status(403).json({ message: "用户凭证错误,请重新登录" });
    }

    if (existingUser.power < power) {
      return res.status(403).json({ message: "用户权限不足" });
    }
    return handler(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "服务器内部错误" });
  }
};
