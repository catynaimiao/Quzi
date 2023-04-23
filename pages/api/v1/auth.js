// pages/api/v1/auth.js
import {
  registerController,
  loginController,
} from "../../../server/controller/auth";

import { connectToDatabase } from "../../../server/utils/dbConnect";

export default async function authHandler(req, res) {
  await connectToDatabase();
  const { method } = req;

  switch (method) {
    case "POST":
      const { action } = req.body;
      switch (action) {
        case "register":
          return registerController(req, res);
        case "login":
          return loginController(req, res);
        default:
          return res.status(400).json({ message: "无效的操作" });
      }
    default:
      return res.status(405).json({ message: "不允许的方法" });
  }
}
