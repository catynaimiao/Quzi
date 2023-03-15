import dbConnect from "../../../../common/utils/dbConnect";
import Paper from "../../../../common/models/papers/paper";
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
    const papers = await Paper.find({});
    res.status(200).json(papers);
  }

  if (req.method === "POST") {
    const newPaper = req.body;
    const paper = new Paper(newPaper);
    const response =await paper.save();
    res.status(200).json(response);
  }
}
