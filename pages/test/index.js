import { questionService } from "../../client/services/exams/exam";
import { useEffect, useState } from "react";

const TestPage = () => {
  useEffect(() => {
    questionService.getQuestions().then((response) => {
      console.log(response);
    });
  }, []);
  return <h1>这是测试页面,请查看console</h1>;
};

export default TestPage;
