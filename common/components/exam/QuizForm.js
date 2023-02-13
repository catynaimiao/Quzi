import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  ButtonGroup,
  Button,
  Radio,
} from "@mui/material";

import { useState } from "react";

/**
 * 选择题组件
 * fold 是否折叠
 */
const QuizForm = ({ questions, answer, setAnswer, fold }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
    setAnswer({ ...answer, [currentQuestion + 1]: event.target.value });
  };

  const handleUnfoldOptionSelect = (id, value) => {
    setAnswer({ ...answer, [id]: value });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    const option = answer[currentQuestion + 2] || "";
    setSelectedOption(option);
  };

  const handlePreQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    const option = answer[currentQuestion] || "";
    setSelectedOption(option);
  };

  if (fold) {
    return (
      <Box maxWidth='sm'>
        <Typography variant='h5'>
          单选题 {currentQuestion + 1} / {questions.length}
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
          <Button disabled={currentQuestion <= 0} onClick={handlePreQuestion}>
            上一题
          </Button>
          <Button
            disabled={currentQuestion === questions.length - 1}
            onClick={handleNextQuestion}>
            下一题
          </Button>
        </ButtonGroup>
      </Box>
    );
  } else {
    return (
      <Box maxWidth='sm'>
        {questions.map((question, index) => {
          return (
            <div key={question.id}>
              <Typography variant='body1' component='p' gutterBottom>
                {index + 1}.{question.question}
              </Typography>
              <RadioGroup
                value={answer[question.id] || ""}
                onChange={(event) => {
                  handleUnfoldOptionSelect(question.id, event.target.value);
                }}>
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.option}
                  />
                ))}
              </RadioGroup>
            </div>
          );
        })}
      </Box>
    );
  }
};

export default QuizForm;
