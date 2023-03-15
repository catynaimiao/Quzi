import dbConnect from "../../../../common/utils/dbConnect";
import jwt from "jsonwebtoken";
import { SECRET } from "../../../../common/utils/config";
import User from "../../../../common/models/userAuth/User";

export default async function handler(req, res) {
  await dbConnect();

  // 强制验证

  const authHeader = req.headers["authorization"];
  const token = authHeader || null;
  let requestUser = null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, SECRET, async (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Forbidden" });
    }
    requestUser = await User.findById(user.id);
  });

  if (req.method === "GET") {
    const response = await User.find({});
    const users = response.map((item) => {
      item.passwordHash = undefined;
      return item;
    });
    res.status(200).json(users);
  }
}
