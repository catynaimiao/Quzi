import axios from "axios";
import TopBanner from "../../../client/components/global/TopBanner";
import { ActiveLink } from "../../../client/configs/navs";

import { useState, useEffect } from "react";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import Link from "next/link";

const UtilsList = ({ list }) => {
  return (
    <div className='flex w-full gap-2'>
      {list.map((item) => (
        <button
          key={item.content}
          onClick={item.handler}
          className='group relative rounded bg-primary-50 px-6 py-2 text-primary-700 shadow  hover:bg-primary-100'>
          <span className='absolute left-0 top-0 flex h-full w-0 flex-nowrap items-center justify-center overflow-hidden whitespace-nowrap rounded bg-primary-100 transition-all duration-300 group-hover:w-full'>
            {item.icon}
            {item.content}
          </span>
          <span className='tracking-wider'>{item.content}</span>
        </button>
      ))}
    </div>
      
  );
};

const QuziCard = ({ quiz }) => {
  return (
    <Link href={`/portal/exams/papers/${paper.id}`}>
      <div className='group flex rounded-xl bg-primary-50 drop-shadow hover:bg-primary-400'>
        <div className='w-64'>
          <div className='text-bas space-y-1 p-4 text-left'>
            <p className='text-lg font-bold text-primary-800 group-hover:text-primary-50'>
              {paper.name ? paper.name : "未命名"}
            </p>
            <p className='text-lg text-primary-500 group-hover:text-primary-100'>
              {paper.creator}
            </p>
            <div className='font-medium'>
              <div className='font-bold text-sky-500 group-hover:text-sky-200'>
                {paper.category ? paper.category : "未分类"}
              </div>
            </div>
            <div className='flex justify-between text-base '>
              <p className='text-primary-400 group-hover:text-primary-100'>
                {paper.status}
              </p>
              <p className='text-primary-400 group-hover:text-primary-100'>
                <span className='font-bold text-primary-500 group-hover:text-primary-50'>
                  {paper.questions.length}
                </span>
                道题
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const QuziList = ({ quizs }) => {
  return (
    <div className='mt-4 flex justify-start gap-4 overflow-scroll py-4'>
      {quizs.map((quiz) => (
        <QuziCard key={quzi.id} paper={quzi} />
      ))}
    </div>
  );
};

const Main = () => {
  const [quizs, setQuizs] = useState([]);

  const button_list = [
    {
      icon: <AddBoxOutlinedIcon />,
      content: "安排考试",
      handler: async () => {
        const auth = await JSON.parse(localStorage.getItem("auth"));
        const { token } = auth;
        console.log(token);
        const res = await axios.post("/api/v1/quizs/quizs", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = res;
        if (data.status === "success") {
          setQuizs([...quizs, data.data]);
        }
      },
    }
  ];

  return (
    <div className='mx-auto md:container'>
      <UtilsList list={button_list} />
    </div>
  );
};

const ExamsView = () => {
  return (
    <div>
      <TopBanner title='考试管理' links={ActiveLink("Admin")} />
      <Main />
    </div>
  );
};

export default ExamsView;
