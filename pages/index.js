import QuizForm from "../common/components/exam/QuizForm";
import { useState } from "react";

const Home = () => {
  const [answer, setAnswer] = useState({});
  const questions = [
    {
      id: 1,
      question: "What is your favorite color?",
      options: [
        { id: "a", option: "Red" },
        { id: "b", option: "Green" },
        { id: "c", option: "Blue" },
        { id: "d", option: "Yellow" },
      ],
    },
    {
      id: 2,
      question: "What is your favorite animal?",
      options: [
        { id: "a", option: "Dog" },
        { id: "b", option: "Cat" },
        { id: "c", option: "Elephant" },
        { id: "d", option: "Lion" },
      ],
    },
    {
      id: 3,
      question: "What is your favorite animal?",
      options: [
        { id: "a", option: "Dog" },
        { id: "b", option: "Cat" },
        { id: "c", option: "Elephant" },
        { id: "d", option: "Lion" },
      ],
    },
  ];

  return (
    <QuizForm
      questions={questions}
      answer={answer}
      setAnswer={setAnswer}
      fold={true}
    />
  );
};

export default Home;
