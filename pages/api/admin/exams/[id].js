import dbConnect from "../../../../common/utils/dbConnect";
import Paper from "../../../../common/models/papers/paper";
import jwt from "jsonwebtoken";
import { SECRET } from "../../../../common/utils/config";
import User from "../../../../common/models/userAuth/User";

export default async function handler(req, res) {
  await dbConnect();

  // 强制验证

  const { id } = req.query;

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
    try {
      const paper = await Paper.findById(id);
      if (paper) {
        return res.status(200).json(paper);
      } else {
        return res
          .status(404)
          .json({ errormessage: "Can't find definite paper" });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ errormessage: "Can't find definite paper" });
    }
  }

  if (req.method === "PUT") {
    try {
      const newPaper = req.body;
      const paper = await Paper.findByIdAndUpdate(id, newPaper);
      if (paper) {
        return res.status(201).json(paper);
      } else {
        return res
          .status(404)
          .json({ errormessage: "Can't find definite paper" });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ errormessage: "Can't find definite paper" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const paper = await Paper.findByIdAndDelete(id);
      if (paper) {
        return res.status(201).json(paper);
      } else {
        return res
          .status(404)
          .json({ errormessage: "Can't find definite paper" });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ errormessage: "Can't find definite paper" });
    }
  }
}
