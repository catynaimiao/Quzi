import { connectToDatabase } from "../../../server/utils/dbConnect";
import { Question, User } from "../../../server/models/models";
import jwt from "jsonwebtoken";

// beartoken parse and auth in nextjs
const tokenparse = async (req, res) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(" ")[1];
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return user;
    }
  }
  return null;
};

export default async function handler(req, res) {
  await connectToDatabase();
  const user = await tokenparse(req, res);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const ExistedUser = await User.findOne({ id: user.id });
  if (!ExistedUser) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (req.method === "GET") {
    // Get all questions
    const questions = await Question.find().populate("creator modifier");
    res.status(200).json({ questions });
  } else if (req.method === "POST") {
    // Create a new question
    const { id, name, options, category } = req.body;
    const question = new Question({
      id,
      name,
      options,
      category,
      creator: user.id,
      modifier: user.id,
    });
    try {
      const result = await question.save();
      res.status(201).json({ message: "Question created", question: result });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Failed to create question", error: err.message });
    }
  } else if (req.method === "PUT") {
    // Update an existing question
    const { id, name, options, category } = req.body;
    try {
      const question = await Question.findById(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      question.name = name;
      question.options = options;
      question.category = category;
      question.modifier = user.id;
      const result = await question.save();
      res.status(200).json({ message: "Question updated", question: result });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Failed to update question", error: err.message });
    }
  } else if (req.method === "DELETE") {
    // Delete an existing question
    const { id } = req.query;
    try {
      const result = await Question.findByIdAndDelete(id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.status(200).json({ message: "Question deleted" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Failed to delete question", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
