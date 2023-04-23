import React, { useState, useEffect } from "react";

function Question({ question, onAnswer }) {
  const [answer, setAnswer] = useState(""); // 用来存储用户的答案

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
    onAnswer(e.target.value);
  };

  return (
    <div className='bg-white p-4 shadow-md'>
      <h2 className='mb-4 text-lg font-bold'>{question.title}</h2>
      {question.options.map((option) => (
        <div key={option.id}>
          <input
            type='radio'
            id={option.id}
            name={question.id}
            value={option.id}
            onChange={handleAnswer}
            checked={answer === option.id}
          />
          <label htmlFor={option.id} className='ml-2'>
            {option.content}
          </label>
        </div>
      ))}
    </div>
  );
}

function ExamPage() {
  const [time, setTime] = useState(60 * 30); // 总共30分钟，即1800秒
  const [isTimeout, setIsTimeout] = useState(false); // 是否超时
  const [currentPage, setCurrentPage] = useState(1); // 当前页码

  useEffect(() => {
    if (time <= 0) {
      setIsTimeout(true);
    } else {
      const timer = setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const questions = [
    {
      id: "question1",
      title: "第一题：这是一个问题？",
      options: [
        { id: "answer1", content: "选项1" },
        { id: "answer2", content: "选项2" },
      ],
    },
    {
      id: "question2",
      title: "第二题：这是另一个问题？",
      options: [
        { id: "answer3", content: "选项3" },
        { id: "answer4", content: "选项4" },
      ],
    },
    {
      id: "question3",
      title: "第三题：这是第三个问题？",
      options: [
        { id: "answer5", content: "选项5" },
        { id: "answer6", content: "选项6" },
      ],
    },
    // 更多问题
  ];

  const [answers, setAnswers] = useState({}); // 用来存储用户的答案

  const handleAnswer = (questionId, answerId) => {
    setAnswers({ ...answers, [questionId]: answerId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 处理提交答案的逻辑
    console.log(answers);
  };

  const pageSize = 2; // 每页显示2个问题
  const totalPages = Math.ceil(questions.length / pageSize); // 总共需要的页数
  const start = (currentPage - 1) * pageSize; // 当前页的起始下标
  const end = start + pageSize; // 当前页的结束下标
  const currentPageQuestions = questions.slice(start, end); // 当前页的问题数组

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between bg-white p-4 shadow-md'>
        <div>
          剩余时间：{Math.floor(time / 60)}:
          {time % 60 < 10 ? `0${time % 60}` : time % 60}
        </div>
        {isTimeout ? (
          <div className='font-bold text-red-500'>时间已到！</div>
        ) : (
          <div>
            {Math.floor(time / 60)}:
            {time % 60 < 10 ? `0${time % 60}` : time % 60} 剩余
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-4'>
          {currentPageQuestions.map((question) => (
            <Question
              key={question.id}
              question={question}
              onAnswer={(answerId) => handleAnswer(question.id, answerId)}
            />
          ))}
        </div>
        <div className='flex justify-between bg-white p-4 shadow-md'>
          <div>
            <button
              type='submit'
              className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
              提交
            </button>
          </div>
          <div>
            第{currentPage}页，共{totalPages}页
          </div>
        </div>
      </form>
    </div>
  );
}

export default ExamPage;
