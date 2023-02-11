import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [questions, setQuestions] = useState([]);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("quizexam") || "{}");

    if (!token) {
      router.push("/login");
    }
    setToken(token);

    axios.get("/api/exam").then((result) => {
      setQuestions(result.data.questions || []);
    });
  }, [router]);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/exam", answer, {
        headers: {
          authorization: token,
        },
      });
      alert("考试完成");
    } catch (error) {}
  };

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
    setAnswer({ ...answer, [currentQuestion]: event.target.value });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    const option = answer[currentQuestion + 1] || "";
    setSelectedOption(option);
  };

  const handlePreQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    const option = answer[currentQuestion - 1] || "";
    setSelectedOption(option);
  };

  if (questions.length === 0)
    return (
      <Container maxWidth='sm'>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant='h5'>
            There is no Exam For you
          </Typography>
        </Paper>
      </Container>
    );

  return (
    <Container maxWidth='sm'>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant='h5'>
          Question {currentQuestion + 1} of {questions.length}
        </Typography>
        <Typography variant='body1' component='p' gutterBottom>
          {questions[currentQuestion].question}
        </Typography>

        <RadioGroup value={selectedOption} onChange={handleOptionSelect}>
          {questions[currentQuestion].options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.id}
              control={<Radio />}
              label={option.option}
            />
          ))}
        </RadioGroup>

        <ButtonGroup variant='contained'>
          <Button onClick={handlePreQuestion}>Previos Question</Button>
          <Button onClick={handleNextQuestion}>Next Question</Button>
        </ButtonGroup>
      </Paper>
    </Container>
  );
};

export default Exam;
