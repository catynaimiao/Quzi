import { useState, useEffect } from "react";
import { questionService } from "../../../../services/exams/exam";
import Image from "next/image";
import nothing from "../../../../../assets/images/nothing.png";
const ExamCard = ({ exam }) => {
  return (
    <div className='group/item  relative flex h-32 w-72  flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-lg hover:bg-primary-50'>
      <div className='absolute left-0 top-0 z-10 hidden h-32 w-72 items-center justify-center rounded-lg bg-primary-100 opacity-80 group-hover/item:flex'>
        <button className='group/button rounded px-6 py-2 text-2xl hover:border-2 hover:border-primary-600 hover:font-bold'>
          参加考试
          <span className='ml-2 hidden group-hover/button:inline-block'>
            ➡️
          </span>
        </button>
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <span className='text-xl font-bold text-gray-900'>
              {exam.title}
            </span>
          </div>
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <div className='flex items-center'>
            <span className='text-sm font-semibold text-gray-500'>
              {exam.description}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <span className='text-sm font-semibold text-gray-500'>
            {exam.questions.length} questions
          </span>
        </div>
        <div className='flex items-center'>
          <span className='text-sm font-semibold text-gray-500'>
            {exam.duration} minutes
          </span>
        </div>
      </div>
    </div>
  );
};

const mockExams = [
  {
    id: 1,
    title: "First Exam",
    description: "This is the first exam",
    time: "2021-08-01 12:00:00",
    duration: 30,
    questions: [
      {
        id: 1,
        title: "What is React?",
        description: "React is a front end library",
        options: [
          {
            id: 1,
            title: "A front end library",
            is_correct: false,
          },
          {
            id: 2,
            title: "A back end framework",
            is_correct: false,
          },
          {
            id: 3,
            title: "A full stack framework",
            is_correct: false,
          },
          {
            id: 4,
            title: "A UI library",
            is_correct: true,
          },
        ],
      },
      {
        id: 2,
        title: "What is Javascript?",
        description: "Javascript is a programming language",
        options: [
          {
            id: 1,
            title: "A front end library",
            is_correct: false,
          },
          {
            id: 2,
            title: "A back end framework",
            is_correct: false,
          },
          {
            id: 3,
            title: "A full stack framework",
            is_correct: false,
          },
          {
            id: 4,
            title: "A UI library",
            is_correct: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Seconde Exam",
    description: "This is the second exam",
    duration: 30,
    time: "2021-08-01 12:00:00",
    questions: [
      {
        id: 1,
        title: "What is React?",
        description: "React is a front end library",
        options: [
          {
            id: 1,
            title: "A front end library",
            is_correct: false,
          },
          {
            id: 2,
            title: "A back end framework",
            is_correct: false,
          },
          {
            id: 3,
            title: "A full stack framework",
            is_correct: false,
          },
          {
            id: 4,
            title: "A UI library",
            is_correct: true,
          },
        ],
      },
      {
        id: 2,
        title: "What is Javascript?",
        description: "Javascript is a programming language",
        options: [
          {
            id: 1,
            title: "A front end library",
            is_correct: false,
          },
          {
            id: 2,
            title: "A back end framework",
            is_correct: false,
          },
          {
            id: 3,
            title: "A full stack framework",
            is_correct: false,
          },
          {
            id: 4,
            title: "A UI library",
            is_correct: true,
          },
        ],
      },
    ],
  },
];

const useExams = () => {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    const fetchExams = async () => {
      const data = await questionService.getQuestions();
      setExams(data);
    };
    fetchExams();
  }, []);
  return { exams };
};

const ExamsList = ({ user }) => {
  const exams = useExams(); //
  //const exams = mockExams;
  return (
    <>
      {!exams.length ? (
        <div className='flex h-full mt-2 w-full flex-col items-center justify-center p-4'>
          <div className='max-h-[200px] max-w-[200px]'>
            <Image src={nothing} alt='nothing' />
          </div>
          <div className='text-primary-500 font-bold text-2xl tracking-wider subpixel-antialiased font-serif '>目前没有考试</div>
        </div>
      ) : (
        <div className='flex flex-row flex-wrap gap-4 pt-4 overflow-hidden'>
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} state={2} />
          ))}
        </div>
      )}
    </>
  );
};

export default ExamsList;
