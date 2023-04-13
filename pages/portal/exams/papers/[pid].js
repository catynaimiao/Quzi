import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Link from "next/link";

import TopBanner from "../../../../client/components/global/TopBanner";
import { ActiveLink } from "../../../../client/configs/navs";

const TagInput = ({ tags, setTags, label, disabled }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const run = async () => {
      const { token } = await JSON.parse(localStorage.getItem("auth"));
      const response = await axios.get(`/api/v1/papers/papers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const papers = response.data.data;
      const categorys = papers.reduce((acc, paper) => {
        acc.push(paper.category.split(/[,，]/));
        return acc;
      }, []);
      const categorysSet = new Set(categorys.flat());
      setOptions(Array.from(categorysSet));
    };
    run();
  }, []);

  const handleInputChange = (event, value) => {
    console.log(value);
    setTags(value);
  };

  const handleDelete = (chipToDelete) => () => {
    setTags((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Autocomplete
      multiple
      options={options}
      value={tags}
      onChange={handleInputChange}
      freeSolo
      disabled={disabled}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option}
            variant='outlined'
            label={option}
            onDelete={handleDelete(option)}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant='outlined' label={label} />
      )}
    />
  );
};

const Main = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [status, setStatus] = useState("");
  const [tags, setTags] = useState([]);
  const [paper, setPaper] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [edit, setEdit] = useState(false);
  const [paperName, setPaperName] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    const run = async () => {
      const { token } = await JSON.parse(localStorage.getItem("auth"));
      try {
        const paper = await axios
          .get(`/api/v1/papers/paper/${pid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            return res.data.data;
          });

        const questions = await axios
          .get(`/api/v1/questions`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            return res.data.questions;
          });
        console.log(paper);
        setPaper(paper);
        setPaperName(paper.name);
        setTags(paper.category.split(/[,，]/));
        setStatus(paper.status);
        setQuestions(questions);
      } catch (error) {
        //router.push("/portal/exams/papers");
      }
    };

    if (pid) {
      run();
    }
  }, [pid, router]);

  if (!paper) return null;

  const StatusOptions=["未发布","已发布"]

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "题目",
      width: 300,
    },
    {
      field: "type",
      headerName: "类型",
      type: "number",
      width: 110,
    },
  ];

  const rows = paper.questions.map((q, i) => ({
    id: i + 1,
    name: q.name,
    type: q.options.length > 1 ? "多选题" : "单选题",
  }));

  const editColumns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "题目",
      width: 300,
    },
    {
      field: "type",
      headerName: "类型",
      type: "number",
      width: 110,
    },
  ];

  const editRows = questions.map((q, i) => ({
    id: i + 1,
    name: q.name,
    type: q.options.length > 1 ? "多选题" : "单选题",
    action: "删除",
  }));

  const handleChangeEdit = () => {
    const selectedQuestions = questions.map((q, i) => {
      return paper.questions.find((pq) => pq.id === q.id) ? i + 1 : null;
    });
    console.log(selectedQuestions);
    setRowSelectionModel(selectedQuestions);
    setEdit(true);
  };

  const handleEditQuestions = async () => {
    if (!edit) return;
    const { token } = await JSON.parse(localStorage.getItem("auth"));
    const updatePaper = {
      name: paperName,
      status,
      questions: rowSelectionModel.map((i) => questions[i - 1].id),
      category: tags.join(","),
    };
    const response = await axios.put(
      `/api/v1/papers/paper/${pid}`,
      updatePaper,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setPaper(response.data.data);
    setRowSelectionModel([]);
    setEdit(false);
  };

  const hanldeDeletePaper = async () => {
    const { token } = await JSON.parse(localStorage.getItem("auth"));
    await axios.delete(`/api/v1/papers/paper/${pid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    router.push("/portal/exams/papers");
  };

  return (
    <div className='mx-auto md:container'>
      <div className='grid h-[600px] grid-cols-12 gap-4'>
        <div className='col-span-8 row-span-4'>
          <DataGrid
            rows={edit ? editRows : rows}
            columns={edit ? editColumns : columns}
            selectionModel={rowSelectionModel}
            onSelectionModelChange={(newSelection) => {
              setRowSelectionModel(newSelection);
            }}
            checkboxSelection={edit}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
          />
        </div>
        <div className='col-span-4 row-span-2 rounded border'>
          <div className='full'>
            <form className='flex flex-col space-y-2 p-4'>
              <TextField
                fullWidth
                label='考试名称'
                variant='outlined'
                value={paperName}
                onChange={(e) => setPaperName(e.target.value)}
                disabled={!edit}
              />
              <TagInput
                label='考试分类'
                tags={tags}
                setTags={setTags}
                disabled={!edit}
              />
              <TextField
                id='outlined-select-currency'
                select
                disabled={!edit}
                label='发布状态'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                helperText='选择你的发布状态'>
                {StatusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </form>
          </div>
        </div>
        <div className='col-span-4 row-span-2 rounded border bg-primary-50'>
          <div className='flex flex-col gap-4 p-4'>
            <button
              className='rounded bg-primary-500 py-2 px-4 font-bold text-white hover:bg-primary-700'
              onClick={edit ? handleEditQuestions : handleChangeEdit}>
              {edit ? "保存编辑" : "开始编辑"}
            </button>
            <button
              className='rounded bg-primary-500 py-2 px-4 font-bold text-white hover:bg-primary-700'
              onClick={hanldeDeletePaper}>
              删除试卷
            </button>
            <Link
              href='/portal/exams/papers'
              className='rounded bg-primary-500 py-2 px-4 text-center font-bold text-white hover:bg-primary-700'>
              全部试卷
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaperView = () => {
  return (
    <div>
      <TopBanner title='考试管理' links={ActiveLink("Admin")} />
      <Main />
    </div>
  );
};

export default PaperView;
