import {
  getQuestion,
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getExam,
  getExams,
  createExam,
  updateExam,
  deleteExam,
} from "../../../../server/controller/exams";
// 使用 jwt auth 中间件

import { withAuth, withPower } from "../../../../server/controller/withAuth";
import dbConnect from "../../../../server/utils/dbConnect";

async function handler(req, res) {
  await dbConnect();

  const {
    query: { mode },
    method,
  } = req;

  switch (mode) {
    case "questions":
      switch (method) {
        case "GET":
          if (req.query.id) {
            await getQuestion(req, res);
          } else {
            await getQuestions(req, res);
          }
          break;
        case "POST":
          await createQuestion(req, res);
          break;
        case "PUT":
          await updateQuestion(req, res);
          break;
        case "DELETE":
          await deleteQuestion(req, res);
          break;
        default:
          res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
    case "exams":
      switch (method) {
        case "GET":
          if (req.params.id) {
            await getExam(req, res);
          } else {
            await getExams(req, res);
          }
          break;
        case "POST":
          await createExam(req, res);
          break;
        case "PUT":
          await updateExam(req, res);
          break;
        case "DELETE":
          await deleteExam(req, res);
          break;
        default:
          res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
    default:
      res.status(404).end("Not found");
      break;
  }
}

export default withAuth(withPower(handler, 1));
