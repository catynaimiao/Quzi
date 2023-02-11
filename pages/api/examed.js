import jwt from "jsonwebtoken";
import { SECRET } from "../../utils/config";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const authHeader = req.headers["authorization"];
    const token = authHeader || null;

    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    jwt.verify(token, SECRET, (error, user) => {
      if (error) {
        return res.status(403).send("Forbidden");
      }
      res.status(201).json(req.body);
    });
  }
}
