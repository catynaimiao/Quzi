import QuizForm from "../common/components/exam/QuizForm";
import { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import exam from "../questions";

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

const Home = () => {
  const [answer, setAnswer] = useState({});

  const handleSubmit = (event) => {
    console.log(answer);
    window.alert(concluteScores());
  };

  const concluteScores = () => {
    return exam.anwsers.reduce((accumulator, currentValue, currentIndex) => {
      if (answer[currentIndex + 1] === currentValue) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant="h4">{exam.title}</Typography>
      <QuizForm
        questions={exam.questions}
        answer={answer}
        setAnswer={setAnswer}
        fold={true}
      />
      <Box sx={{ mt: 2 }}>
        <Button variant='contained' onClick={handleSubmit}>
          提交
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
