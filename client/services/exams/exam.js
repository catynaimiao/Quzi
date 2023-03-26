import axios from "axios";
import { localAuth } from "../auth/auth";

const API_URL = "http://localhost:3001/api/v1/exams";
const { token } = localAuth();

const service = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

service.interceptors.request.use((config) => {
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export const questionService = {
  getQuestions: async () => {
    const res = await service.get(`?mode=questions`);
    return res.data;
  },

  getQuestion: async (id) => {
    const res = await service.get(`?mode=questions&id=${id}`);
    return res.data;
  },

  createQuestion: async (question) => {
    const res = await service.post(`?mode=questions`, question);
    return res.data;
  },

  updateQuestion: async (id, question) => {
    const res = await service.put(`?mode=questions&id=${id}`, question);
    return res.data;
  },

  deleteQuestion: async (id) => {
    const res = await service.delete(`?mode=questions&id=${id}`);
    return res.data;
  },
};

export const examService = {
  getExam: async () => {
    const res = await service.get(`?mode=exams&id=${id}`);
    return res.data;
  },

  getExams: async () => {
    const res = await service.get(`?mode=exams`);
    return res.data;
  },

  createExam: async (exam) => {
    const res = await service.post(`?mode=exams`, exam);
    return res.data;
  },

  updateExam: async (id, exam) => {
    const res = await service.put(`?mode=exams&id=${id}`, exam);
    return res.data;
  },

  deleteExam: async (id) => {
    const res = await service.delete(`?mode=exams&id=${id}`);
    return res.data;
  },
};
