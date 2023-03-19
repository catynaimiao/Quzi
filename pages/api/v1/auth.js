// pages/api/auth.js
import dbConnect from "../../../server/utils/dbConnect";

import {
  registerController,
  loginController,
} from "../../../server/controller/auth";

export default async function authHandler(req, res) {
  await dbConnect();
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
