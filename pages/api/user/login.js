import jwt from "jsonwebtoken";
import User from "../../../common/models/User";
import dbConnect from "../../../common/utils/dbConnect";
import { SECRET } from "../../../common/utils/config";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { username, password } = req.body;
    console.log(username);
    const existUser = await User.findOne({ username });

    if (!existUser) {
      res.status(401).json({ message: "账户名不存在" });
    } else {
      const passwordCorrect = await bcrypt.compare(
        password,
        existUser.passwordHash,
      );

      if (passwordCorrect) {
        res.status(200).json({
          name: existUser.name,
          token: jwt.sign({ username, id: existUser.id }, SECRET),
        });
      } else {
        res.status(401).json({ message: "密码错误" });
      }
    }
  }

  if (req.method === "GET") {
    res.status(200).json({ message: "ok" });
  }
}
