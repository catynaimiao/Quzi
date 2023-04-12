import TopBanner from "../../../client/components/global/TopBanner";
import useSWR from "swr";
import axios from "axios";
import { ActiveLink } from "../../../client/configs/navs";

import { Alert, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useContext, createContext, useEffect, useState } from "react";

const useLocalAuth = () => {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("auth"));
    if (local) {
      setAuth(`Bearer ${local.token}`);
    }
  }, []);
  return auth;
};

// 试题列表
const QuestionsTable = ({
  questions,
  selectEditTarget,
  setShowTrue,
  handleDeleteQuestion,
  handleAddQuestion,
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
            <th className='bg-primary-600 py-2 px-4 text-left font-bold text-white'>
              分类
            </th>
            <th className='bg-primary-600 py-2 px-4 text-left font-bold text-white'>
              类型
            </th>
            <th className='rounded-tr-lg bg-primary-600 py-2 px-4 text-center font-bold text-white'>
              <button
                onClick={handleAddQuestion}
                className='rounded bg-primary-300 px-2 hover:bg-primary-400'>
                新建题目
                <AddIcon className='inline-block text-sm' />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className='divide-y'>
          {questions.map((item, index) => (
            <tr key={item.id} className='hover:bg-primary-50'>
              <td className='px-4 py-2 text-left'>{index + 1}</td>
              <td className='px-4 py-2 text-left'>{item.name}</td>
              <td className='flex max-w-[180px] flex-wrap justify-start gap-1 px-4 py-2'>
                {item.category
                  ? item.category.split(/[,，]/).map((item) => (
                      <span
                        className='rounded-l-full rounded-r-full border bg-primary-300 px-1 text-sm text-white'
                        key={item}>
                        {item}
                      </span>
                    ))
                  : "无分类"}
              </td>
              <td className='px-4 py-2 text-left'>
                <span className='whitespace-nowrap rounded-r-lg rounded-l-lg bg-primary-400 px-1 py-1 text-sm font-bold text-white shadow'>
                  {item.options.filter((item) => item.isCorrect).length > 1
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

// 试题编辑窗口
const QuestionEdit = ({ editTarget, handleSaveQuestion, setShowFalse }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState([
    { id: 1, content: "", isCorrect: true },
  ]);

  useEffect(() => {
    if (editTarget) {
      setTitle(editTarget.name);
      setCategory(editTarget.category);
      setOptions(editTarget.options);
    }
  }, [editTarget]);

  // handle for form submit.
  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      id: editTarget.id,
      name: title,
      category: category,
      options: options,
    };
    if (editTarget) {
      handleSaveQuestion(question);
    } else {
      throw new Error("未选择 edittarget");
    }
  };

  // handle for form values change.
  const handleAddOption = (e) => {
    e.preventDefault();
    setOptions([
      ...options,
      {
        id: options.length + 1,
        content: "新选项",
        isCorrect: false,
      },
    ]);
  };

  const handleDeleteOption = (e, id) => {
    e.preventDefault();
    const filterOption = options.filter((item) => item.id !== id);
    const newOptions = filterOption.map((item, index) => {
      item.id = index + 1;
      return item;
    });
    setOptions(newOptions);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleOptionsChange = async (e, id) => {
    const newOptions = options.map((item) => {
      if (item.id === id) {
        return { ...item, content: e.target.value };
      } else {
        return item;
      }
    });
    setOptions(newOptions);
  };

  const handleOptionAnswerChange = (e, id) => {
    const newOptions = options.map((item) => {
      if (item.id === id) {
        return { ...item, isCorrect: e.target.checked };
      } else {
        return item;
      }
    });
    setOptions(newOptions);
  };

  // view codes
  return (
    <div className='w-full rounded border  p-4 pt-0 shadow'>
      <div className='flex w-full items-center justify-between pb-2'>
        <div className='font-bold italic text-primary-300'>
          #{editTarget ? editTarget.index + 1 : "选择编辑的题目"}
        </div>
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
                checked={item.isCorrect}
                value={item.isCorrect}
                onChange={(e) => handleOptionAnswerChange(e, item.id)}
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
                onClick={(e) => handleDeleteOption(e, item.id)}>
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
              onClick={(e) => {
                e.preventDefault();
                setShowFalse();
              }}
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
  const token = useLocalAuth();
  const fetcher = async (url) => {
    const auth = await JSON.parse(localStorage.getItem("auth"));
    const { token } = auth;
    return axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data);
  };
  const { data } = useSWR("/api/v1/questions", fetcher);
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [editTarget, setEditTarget] = useState(null);

  const { setAlert } = useContext(AlertContext);

  const handleAddQuestion = async () => {
    const newQuestion = {
      id: questions.length + 1,
      name: "一个创建的新题目",
      category: "",
      options: [
        {
          id: 1,
          content: "试题选项1",
          isCorrect: false,
        },
        {
          id: 2,
          content: "试题选项2",
          isCorrect: false,
        },
      ],
    };
    try {
      const response = await axios.post("/api/v1/questions", newQuestion, {
        headers: {
          Authorization: token,
        },
      });
      const { question } = response.data;
      setQuestions([...questions, question]);
      setAlert("创建成功", "success");
    } catch (error) {
      setAlert("创建失败", "error");
    }
  };

  const handleDeleteQuestion = async (id) => {
    const newQuestions = questions.filter((item) => item.id !== id);
    try {
      const response = await axios.delete(`/api/v1/questions?id=${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setQuestions(newQuestions);
      setAlert("删除成功", "success");
    } catch (error) {
      setAlert("删除失败", "error");
    }
  };

  const handleSaveQuestion = async (question) => {
    try {
      const response = await axios.put(`/api/v1/questions`, question, {
        headers: {
          Authorization: token,
        },
      });
      const { question: newQuestion } = response.data;
      setQuestions(
        questions.map((item) => {
          if (item.id === question.id) {
            return newQuestion;
          }
          return item;
        }),
      );
      setAlert("保存成功", "success");
    } catch (error) {
      setAlert("保存失败", "error");
    }
  };

  useEffect(() => {
    if (data) {
      setQuestions(data.questions);
    }
  }, [data]);

  const setShowTrue = () => {
    setShow(true);
  };

  const setShowFalse = () => {
    setShow(false);
  };

  const selectEditTarget = (id, index) => {
    const target = questions.find((question) => question.id === id);
    target.index = index;
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
          handleAddQuestion={handleAddQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      </div>
      <div className={`${show ? "xl:col-span-2" : "hidden"} col-span-6`}>
        <QuestionEdit
          setShowFalse={setShowFalse}
          editTarget={editTarget}
          handleSaveQuestion={handleSaveQuestion}
        />
      </div>
    </div>
  );
};

const AlertContext = createContext();

const TopAlert = () => {
  const { getAlert } = useContext(AlertContext);
  const { message, severity, show, setAlertFalse } = getAlert();
  return (
    <Snackbar
      open={show}
      autoHideDuration={3000}
      onClose={() => {
        setAlertFalse();
      }}>
      <Alert
        variant='filled'
        severity={severity}
        onClose={() => {
          setAlertFalse();
        }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const QuestionsView = () => {
  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const setAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertShow(true);
  };

  const getAlert = () => {
    return {
      message: alertMessage,
      severity: alertSeverity,
      show: alertShow,
      setAlertFalse: () => setAlertShow(false),
    };
  };

  return (
    <div>
      <TopBanner links={ActiveLink("Admin")} title='题库管理' />
      <AlertContext.Provider value={{ setAlert, getAlert }}>
        <TopAlert />
        <div className='container mx-auto'>
          <Main />
        </div>
      </AlertContext.Provider>
    </div>
  );
};

export default QuestionsView;
