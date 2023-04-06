import TopBanner from "../../../client/components/global/TopBanner";
import useSWR from "swr";
import { ActiveLink } from "../../../client/configs/navs";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useEffect, useState } from "react";

const QuestionsTable = ({
  questions,
  selectEditTarget,
  setShowTrue,
  handleDeleteQuestion,
}) => {
  return (
    <div className='h-[600px] w-full table-auto  overflow-y-auto rounded-lg border shadow'>
      <table className='w-full text-primary-600'>
        <thead className='sticky top-0'>
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
        <tbody className='divide-y'>
          {questions.map((item, index) => (
            <tr key={item.id} className='hover:bg-primary-50'>
              <td className='px-4 py-2 text-left'>{index + 1}</td>
              <td className='px-4 py-2 text-left'>{item.name}</td>
              <td className='px-4 py-2 text-left'>
                {item.category ? item.category : "无分类"}
              </td>
              <td className='px-4 py-2 text-left'>
                <span className='rounded-r-lg rounded-l-lg bg-primary-400 px-1 py-1 text-sm font-bold text-white shadow'>
                  {item.options.filter((item) => item.isCorrect) > 1
                    ? "多选题"
                    : "单选题"}
                </span>
              </td>
              <td className='border-l border-l-primary-200'>
                <div className='flex items-center justify-center'>
                  <button
                    className='text-md p-1 text-primary-500'
                    onClick={() => {
                      setShowTrue();
                      selectEditTarget(item.id, index);
                    }}>
                    编辑
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteQuestion(item.id);
                    }}
                    className='text-md p-1 text-primary-500'>
                    删除
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='text-md border-t py-2 text-center text-primary-300 '>
        没有更多数据了...
      </div>
    </div>
  );
};

const QuestionEdit = ({
  editTarget,
  handleAddQuestion,
  handleSaveQuestion,
}) => {
  const [title, setTitle] = useState(editTarget ? editTarget.name : "");
  const [type, setType] = useState(editTarget ? editTarget.type : "单选题");
  const [category, setCategory] = useState(
    editTarget ? editTarget.category : "默认分类",
  );
  const [options, setOptions] = useState(
    editTarget ? editTarget.options : [{ id: 1, content: "", is_answer: true }],
  );

  useEffect(() => {
    if (editTarget) {
      setTitle(editTarget.name);
      setType(editTarget.type);
      setCategory(editTarget.category);
      setOptions(editTarget.options);
    }
  }, [editTarget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      name: title,
      type: type,
      category: category,
      options: options,
    };
    if (editTarget) {
      handleSaveQuestion(editTarget.id, question);
    } else {
      handleAddQuestion(question);
    }
  };

  const handleAddOption = (e) => {
    e.preventDefault();
    setOptions([
      ...options,
      {
        id: options.length + 1,
        content: "",
        is_answer: false,
      },
    ]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleOptionsChange = (e, id) => {
    const newOptions = options.map((item) => {
      if (item.id === id) {
        return { ...item, content: e.target.value };
      } else {
        return item;
      }
    });
    setOptions(newOptions);
  };

  const handleDeleteOption = (id) => {
    const newOptions = options.filter((item) => item.id !== id);
    setOptions(newOptions);
  };

  return (
    <div className='w-full rounded border  p-4 pt-0 shadow'>
      <div className='flex w-full items-center justify-between pb-2'>
        <div className='font-bold italic text-primary-300'>
          #{editTarget ? editTarget.index + 1 : "选择编辑的题目"}
        </div>
        <button
          onClick={() => {
            handleAddQuestion();
          }}
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
            placeholder='问题的全部内容...'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className='mb-2 mt-4 font-bold text-primary-700 drop-shadow'>
          题目分类
        </div>
        <input
          className='block w-full resize-none rounded-md  border-2 border-primary-100 p-1 pl-2 shadow outline-0 placeholder:italic placeholder:text-primary-200 focus:border-primary-200 focus:ring focus:ring-opacity-50 md:resize-y'
          type='text'
          maxLength='8'
          placeholder='XX,XX,XX'
          value={category}
          onChange={handleCategoryChange}
        />
        <div className='mb-2 mt-4 font-bold text-primary-700 drop-shadow'>
          答案选项
        </div>
        <>
          {options.map((item, index) => (
            <div
              key={item.id}
              className='mt-2 flex w-full flex-row items-center rounded border-2 border-primary-100 py-1 shadow outline-0 focus-within:border-primary-200 focus-within:ring focus-within:ring-opacity-50'>
              <input
                type='checkbox'
                className='mx-1 appearance-none overflow-hidden rounded-md border-2 border-primary-300 p-2  checked:border-primary-200 checked:bg-primary-400'
              />
              <input
                className='block grow  border-primary-500 pl-2 outline-0 placeholder:italic placeholder:text-primary-200'
                type='text'
                placeholder='选项内容...'
                value={item.content}
                onChange={(e) => handleOptionsChange(e, item.id)}
              />
              <button
                className='mr-2 rounded-md px-2 text-primary-400 hover:bg-primary-600 hover:text-white'
                onClick={() => {
                  handleDeleteOption(item.id);
                }}>
                删除
              </button>
            </div>
          ))}
        </>
        <div className='mt-4 flex justify-between'>
          <button onClick={handleAddOption}>
            <AddCircleIcon className='rounded-full text-3xl text-primary-400 hover:ring' />
          </button>
          <div className='flex flex-row-reverse gap-4'>
            <button
              onClick={handleSubmit}
              className='rounded-md bg-primary-500 px-2 py-1 font-bold text-white hover:bg-primary-700 hover:ring'>
              保存
            </button>
            <button
              type='reset'
              className='font-bold text-primary-500 hover:text-red-900'>
              取消
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Main = ({}) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/v1/questions", fetcher);

  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [editTarget, setEditTarget] = useState(null);

  const handleAddQuestion = (question) => {
    const newQuestion = {
      id: questions.length + 1,
      name: "",
      category: "",
      options: [
        {
          id: 1,
          content: "",
          isCorrect: false,
        },
      ],
    };
    if (question) {
      setQuestions([...questions, question]);
    } else {
      console.log("questions", questions);
      setQuestions([...questions, newQuestion]);
    }
  };

  const handleDeleteQuestion = (id) => {
    const newQuestions = questions.filter((item) => item.id !== id);
    setQuestions(newQuestions);
  };

  const handleSaveQuestion = (id, question) => {
    const newQuestions = questions.map((item) => {
      if (item.id === id) {
        return question;
      } else {
        return item;
      }
    });
    setQuestions(newQuestions);
  };

  useEffect(() => {
    if (data) {
      setQuestions(data.questions);
    }
  }, [data]);

  const toggleShow = () => {
    setShow(!show);
  };
  const setShowTrue = () => {
    setShow(true);
  };

  const setShowFalse = () => {
    setShow(false);
  };

  const selectEditTarget = (id, index) => {
    const target = questions.find((question) => question.id === id);
    console.log("target:", target);
    target.index = index;
    console.log("target with index:", target);
    setEditTarget(target);
  };

  return (
    <div className='grid grid-cols-6 items-stretch gap-4 '>
      <div
        className={`${show ? "xl:col-span-4" : "lg:col-span-6"} col-span-6 `}>
        <QuestionsTable
          questions={questions}
          selectEditTarget={selectEditTarget}
          setShowTrue={setShowTrue}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      </div>
      <div className={`${show ? "xl:col-span-2" : "hidden"} col-span-6`}>
        <QuestionEdit
          editTarget={editTarget}
          handleAddQuestion={handleAddQuestion}
          handleSaveQuestion={handleSaveQuestion}
        />
      </div>
    </div>
  );
};

const QuestionsView = () => {
  return (
    <div>
      <TopBanner links={ActiveLink("Admin")} title='题库管理' />
      <div className='container mx-auto'>
        <Main />
      </div>
    </div>
  );
};

export default QuestionsView;
