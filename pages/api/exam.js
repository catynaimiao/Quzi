import jwt from "jsonwebtoken";
import dbConnect from "../../utils/dbConnect";
import Exam from "../../models/Exam";
import { SECRET } from "../../utils/config";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const exams = await Exam.find({});
    console.log(exams);
    res.status(200).json(exams);
  }
}
