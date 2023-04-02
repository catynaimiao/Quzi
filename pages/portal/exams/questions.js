import TopBanner from "../../../client/components/global/TopBanner";
import { ActiveLink } from "../../../client/configs/navs";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SummarizeIcon from "@mui/icons-material/Summarize";

import { useState } from "react";

const SliderList = ({ list }) => {
  return (
    <div className='flex flex-col'>
      {list.map((item) => (
        <div
          className={
            item.selected
              ? "rounded-r-2xl rounded-l-sm bg-primary-100 py-2"
              : "rounded-r-2xl rounded-l-sm py-2 hover:bg-gray-200"
          }
          key={item.name}>
          <span
            className={
              item.selected ? "mx-2 text-primary-500" : "mx-2 text-gray-400"
            }>
            {item.icon}
          </span>
          <span
            className={
              item.selected
                ? " overflow-hidden align-baseline font-bold tracking-wide  text-primary-900"
                : " align-baseline tracking-wide text-gray-500"
            }>
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

const UtilsLayout = ({ children, leftContent }) => {
  return (
    <div className='container mx-auto'>
      <div className='flex flex-row gap-8'>
        <div className='hidden  w-[200px] sm:block'>{leftContent}</div>
        <div className='grow'>{children}</div>
      </div>
    </div>
  );
};

const mock_sliderlist = [
  {
    name: "题库管理",
    icon: <NoteAltIcon />,
    selected: true,
  },
  {
    name: "试卷管理",
    icon: <SummarizeIcon />,
    selected: false,
  },
];

const LeftContent = ({ list }) => {
  return (
    <>
      <h2 className='mb-2 mt-4 pl-2 font-bold text-primary-500'>试题相关</h2>
      <SliderList list={mock_sliderlist} />
    </>
  );
};

const mock_questions = [
  {
    id: 1,
    title: "这是一道题目",
    type: "单选题",
    options: [
      {
        id: 1,
        content: "这是选项1",
        is_answer: true,
      },
      {
        id: 2,
        content: "这是选项2",
        is_answer: false,
      },
      {
        id: 3,
        content: "这是选项3",
        is_answer: false,
      },
      {
        id: 4,
        content: "这是选项4",
        is_answer: false,
      },
    ],
  },
  {
    id: 2,
    title: "这是一道题目",
    type: "单选题",
    options: [
      {
        id: 1,
        content: "这是选项1",
        is_answer: true,
      },
      {
        id: 2,
        content: "这是选项2",
        is_answer: false,
      },
      {
        id: 3,
        content: "这是选项3",
        is_answer: false,
      },
      {
        id: 4,
        content: "这是选项4",
        is_answer: false,
      },
    ],
  },
];

const QuestionsTable = ({ questions }) => {
  return (
    <div className='w-full table-auto rounded-lg  border shadow lg:min-h-[400px]'>
      <table className='w-full text-primary-600'>
        <thead>
          <tr>
            <th className='rounded-tl-lg bg-primary-600 px-4 py-2 text-left font-bold text-white'>
              #
            </th>
            <th className='bg-primary-600 px-4 py-2 text-left font-bold text-white'>
              题目
            </th>
            <th className='pu-2 bg-primary-600 px-4 text-left font-bold text-white'>
              分类
            </th>
            <th className='pu-2 bg-primary-600 px-4 text-left font-bold text-white'>
              类型
            </th>
            <th className='pu-2 rounded-tr-lg bg-primary-600 px-4 text-center font-bold text-white'>
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {questions.map((item) => (
            <tr key={item.id}>
              <td className='border-t-2 px-4 py-2 text-left'>{item.id}</td>
              <td className='border-t-2 px-4 py-2 text-left'>{item.title}</td>
              <td className='border-t-2 px-4 py-2 text-left'>xx,xx,xx</td>
              <td className='border-t-2 px-4 py-2 text-left'>
                <span className='rounded-r-lg rounded-l-lg bg-primary-400 px-1 py-1 text-sm font-bold text-white shadow'>
                  {item.type}
                </span>
              </td>
              <td className='border-t-2 border-l border-l-primary-200'>
                <div className='flex items-center justify-center'>
                  <button className='text-md p-1 text-primary-500 '>
                    编辑
                  </button>
                  <button className='text-md p-1 text-primary-500 '>
                    删除
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='text-md border-t pt-2 text-center text-primary-300 '>
        没有更多数据了...
      </div>
    </div>
  );
};

const QuestionEdit = ({ question }) => {
  return (
    <div className='w-full rounded border border-l-primary-500 p-4 pt-0 shadow'>
      <div className='flex w-full items-center justify-between pb-2'>
        <div className='font-bold italic text-primary-300'>
          #{question ? question.id : "选择编辑的题目,或➡️"}
        </div>
        <button
          className='group/add items-center rounded-b-md bg-primary-500 p-1 text-white ring-primary-300 drop-shadow hover:ring
        '>
          新建题目{" "}
          <AddCircleIcon className=' rounded-full ring-white group-hover/add:ring' />
        </button>
      </div>
      <form className='flex w-full flex-col'>
        <div className='mb-2 font-bold text-primary-700 drop-shadow'>
          问题题目
        </div>
        <div>
          <textarea
            className='block w-full resize-none rounded-md  border-2 border-primary-100 p-1 pl-2 shadow outline-0 placeholder:italic placeholder:text-primary-200 focus:border-primary-200 focus:ring focus:ring-opacity-50 md:resize-y'
            type='text'
            maxLength='8'
            placeholder='问题的全部内容...'
          />
        </div>
        <div className='mb-2 mt-4 font-bold text-primary-700 drop-shadow'>
          题目类型
        </div>
        <select className='block w-full resize-none rounded-md  border-2 border-primary-100 p-1 pl-2 shadow outline-0 placeholder:italic placeholder:text-primary-200 focus:border-primary-200 focus:ring focus:ring-opacity-50 md:resize-y'>
          <option>单选题</option>
        </select>
        <div className='mb-2 mt-4 font-bold text-primary-700 drop-shadow'>
          答案选项
        </div>
        <div className='mt-2 flex w-full flex-row items-center rounded border-2 border-primary-100 py-1 shadow outline-0 focus-within:border-primary-200 focus-within:ring focus-within:ring-opacity-50'>
          <input
            type='checkbox'
            className='mx-1 appearance-none overflow-hidden rounded-md border-2 border-primary-300 p-2  checked:border-primary-200 checked:bg-primary-400'
          />
          <input
            className='block grow  border-primary-500 pl-2 outline-0 placeholder:italic placeholder:text-primary-200'
            type='text'
            placeholder='选项内容...'
          />
          <button className='mr-2 rounded-md px-2 text-primary-400 hover:bg-primary-600 hover:text-white'>
            删除
          </button>
        </div>
        <div className='mt-2 flex w-full flex-row items-center rounded border-2 border-primary-100 py-1 shadow outline-0 focus-within:border-primary-200 focus-within:ring focus-within:ring-opacity-50'>
          <input
            type='checkbox'
            className='mx-1 appearance-none overflow-hidden rounded-md border-2 border-primary-300 p-2  checked:border-primary-200 checked:bg-primary-400'
          />
          <input
            className='block grow  border-primary-500 pl-2 outline-0 placeholder:italic placeholder:text-primary-200'
            type='text'
            placeholder='选项内容...'
          />
          <button className='mr-2 rounded-md px-2 text-primary-400 hover:bg-primary-600 hover:text-white'>
            删除
          </button>
        </div>
        <div className='mt-2 flex w-full flex-row items-center rounded border-2 border-primary-100 py-1 shadow outline-0 focus-within:border-primary-200 focus-within:ring focus-within:ring-opacity-50'>
          <input
            type='checkbox'
            className='mx-1 appearance-none overflow-hidden rounded-md border-2 border-primary-300 p-2  checked:border-primary-200 checked:bg-primary-400'
          />
          <input
            className='block grow  border-primary-500 pl-2 outline-0 placeholder:italic placeholder:text-primary-200'
            type='text'
            placeholder='选项内容...'
          />
          <button className='mr-2 rounded-md px-2 text-primary-400 hover:bg-primary-600 hover:text-white'>
            删除
          </button>
        </div>
        <div className='mt-4 flex justify-between'>
          <AddCircleIcon className='rounded-full text-3xl text-primary-400 hover:ring' />
          <div className='flex flex-row-reverse gap-4'>
            <button className='rounded-md bg-primary-500 px-2 py-1 font-bold text-white hover:bg-primary-700 hover:ring'>
              保存
            </button>
            <button className='font-bold text-primary-500 hover:text-red-900'>
              取消
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Main = ({}) => {
  const [show, setShow] = useState(true);

  const setShowTrue = () => {
    setShow(true);
  };
  const setShowFalse = () => {
    setShow(false);
  };

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className='grid grid-cols-6 gap-4 '>
      <div
        className={`${show ? "xl:col-span-4" : "lg:col-span-6"} col-span-6`}
        onClick={toggleShow}>
        <QuestionsTable questions={mock_questions} />
      </div>
      <div className={`${show ? "xl:col-span-2" : "hidden"} col-span-6`}>
        <QuestionEdit />
      </div>
    </div>
  );
};

const QuestionsView = () => {
  return (
    <div>
      <TopBanner links={ActiveLink("Admin")} title='题库管理' />
      <UtilsLayout leftContent={<LeftContent />}>
        <Main />
      </UtilsLayout>
    </div>
  );
};

export default QuestionsView;
