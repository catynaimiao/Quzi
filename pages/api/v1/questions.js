import mongoose from "mongoose";
import { Question } from "../../../server/models/models";

mongoose
  .connect(process.env.MONGO_DEV_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get all questions
    const questions = await Question.find().populate("creator modifier");
    res.status(200).json({ questions });
  } else if (req.method === "POST") {
    // Create a new question
    const { id, name, options, category, creator, modifier } = req.body;
    const question = new Question({
      id,
      name,
      options,
      category,
      creator,
      modifier,
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
    const { id, name, options, category, creator, modifier } = req.body;
    try {
      const question = await Question.findOne({ id });
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      question.name = name;
      question.options = options;
      question.category = category;
      question.modifier = modifier;
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
