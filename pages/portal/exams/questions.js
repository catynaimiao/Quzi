import TopBanner from "../../../client/components/global/TopBanner";
import { ActiveLink } from "../../../client/configs/navs";

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

const UtilsLayout = ({ children, leftContent, rightContent }) => {
  const [show, setShow] = useState(false);

  return (
    <div className='container mx-auto'>
      <div className='flex flex-row flex-wrap gap-4'>
        <div className='hidden  w-[200px] sm:block'>{leftContent}</div>
        <div className='w-64 grow '>{children}</div>
        <div className='w-32 grow '>{rightContent}</div>
      </div>
    </div>
  );
};

const mock_sliderlist = [
  {
    name: "题库管理",
    icon: <i className='fas fa-book'></i>,
    selected: true,
  },
  {
    name: "试卷管理",
    icon: <i className='fas fa-file-alt'></i>,
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
    <div className='w-full table-auto rounded-lg  border shadow'>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='rounded-tl-lg bg-primary-600 px-4 py-2 text-left font-bold text-white'>
              #
            </th>
            <th className='bg-primary-600 px-4 py-2 text-left font-bold text-white'>
              题目
            </th>
            <th className='pu-2 bg-primary-600 px-4 text-left font-bold text-white'>
              类型
            </th>
            <th className='pu-2 rounded-tr-lg bg-primary-600 px-4 text-left font-bold text-white'></th>
          </tr>
        </thead>
        <tbody>
          {questions.map((item) => (
            <tr key={item.id}>
              <td className='border-t-2 px-4 py-2 text-left'>{item.id}</td>
              <td className='border-t-2 px-4 py-2 text-left'>{item.title}</td>
              <td className='border-t-2 px-4 py-2 text-left '>
                <span className='rounded-r-lg rounded-l-lg bg-primary-400 px-1 py-1 text-sm font-bold text-white shadow'>
                  {item.type}
                </span>
              </td>
              <td className='border-t-2'>
                <div className='flex items-center justify-center'>
                  <button className='text-md p-1 text-primary-500 '>
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const QuestionEdit = ({ question }) => {
  return (
    <div className='flex w-full flex-col'>
      <form>
        <div>题目名称</div>
        <div>
          <input className="group " type='text' maxLength='8'></input>
        </div>
      </form>
    </div>
  );
};

const Main = ({}) => {
  return (
    <>
      <QuestionsTable questions={mock_questions} />
    </>
  );
};

const QuestionsView = () => {
  return (
    <div>
      <TopBanner links={ActiveLink("Admin")} title='题库管理' />
      <UtilsLayout
        leftContent={<LeftContent />}
        rightContent={<QuestionEdit />}>
        <Main />
      </UtilsLayout>
    </div>
  );
};

export default QuestionsView;
