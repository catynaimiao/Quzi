import User from "../../../common/models/User";
import jwt from "jsonwebtoken";
import { SECRET } from "../../../common/utils/config";
import dbConnect from "../../../common/utils/dbConnect";
import { EDGE_RUNTIME_WEBPACK } from "next/dist/shared/lib/constants";

const UserCache = {};
let cacheChange = false;

export default async function handler(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader || null;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  if (req.method === "GET") {
    if (cacheChange || UserCache.users) {
      cacheChange = false;
      return res.status(200).json(UserCache.users);
    }
    await dbConnect();
    const users = await User.find({});
    UserCache.users = users;
    return res.status(200).send(users);
  }

  if (req.method === "PUT") {
    const user = jwt.verify(token, SECRET);
    if (user) {
      const { id } = user;
      let existUser = await User.findById(id);
      if (existUser) {
        await existUser.update(req.body);
        cacheChange = true;
        return res.status(201).send("ok");
      } else {
        return res.status(403).send("没有权限");
      }
    }
  }
}
