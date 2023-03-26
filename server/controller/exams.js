import { Question, Exam } from "../models/models";

// 题目模式控制器
export const getQuestions = async (req, res) => {
  try {
    const question = await Question.find({});
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const question = await Question.findOne({ _id: req.query.id });
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findOneAndUpdate(
      { _id: req.query.id },
      req.body,
      { new: true },
    );
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    await Question.deleteOne({ _id: req.query.id });
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

// 考试模式控制器
export const getExams = async (req, res) => {
  try {
    const exam = await Exam.find({});
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

export const getExam = async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.query.id });
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

export const createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findOneAndUpdate({ _id: req.query.id }, req.body, {
      new: true,
    });
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

export const deleteExam = async (req, res) => {
  try {
    await Exam.deleteOne({ _id: req.query.id });
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};
