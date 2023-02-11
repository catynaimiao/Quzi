import jwt from "jsonwebtoken";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { SECRET } from "../../utils/config";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const existUser = await User.findOne({ username });

    if (!existUser) res.status(401).json({ message: "账户名不存在" });

    const passwordCorrect = await bcrypt.compare(password, existUser.passwordHash);

    if (passwordCorrect) {
      res.status(200).json({
        token: jwt.sign({ username }, SECRET),
        id: existUser.id,
      });
    } else {
      res.status(401).json({ message: "密码错误" });
    }
  }

  if (req.method === "GET") {
    res.status(200).json({ message: "ok" });
  }
}
