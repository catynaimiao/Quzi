import { Box, TextField, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";

import Link from "next/link";
import EditPaperDialog from "../../components/exam/EditPaperDialog";
import { useRouter } from "next/router";
import axios from "axios";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
};

const AddExam = ({ user }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const rows = question.map((q) => ({ id: q.id, question: q.question }));
    setRows(rows);
  }, [question]);

  const handleEdit = (params) => {
    setEditItem(question[params.id - 1]);
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPaper = {
      category,
      description,
      title,
      questions: question,
    };
    axios
      .post("/api/admin/exams", newPaper, {
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      })
      .then(() => {
        alert("创建成功");
        router.push("/admin/exams", undefined, { shallow: true });
      });
  };

  const handleAdd = () => {
    const newQuestionItem = {
      id: question.length + 1,
      question: "新问题",
      options: [
        { id: "a", option: "问题1" },
        { id: "b", option: "问题2" },
        { id: "c", option: "问题3" },
      ],
    };
    const newQuestion = [...question];
    newQuestion.push(newQuestionItem);
    setQuestion(newQuestion);
  };

  const handleDelete = (params) => {
    let newQuestion = question.filter((i) => i.id !== params.id);
    for (let i = 0; i < newQuestion.length; i++) {
      newQuestion[i].id = i + 1;
    }
    setQuestion(newQuestion);
  };

  const columns = [
    { field: "id", type: "number", headerName: "id", width: 40 },
    { field: "question", headerName: "题目", width: 400 },
    {
      field: "actions",
      type: "actions",
      headerName: "操作",
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => {
            handleDelete(params);
          }}
          label='Delete'
        />,
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            handleEdit(params);
          }}
          label='Edit'
        />,
      ],
    },
  ];

  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}>
      <Stack direction='row' spacing={1}>
        <Button variant='contained' type='submit'>
          <SaveIcon />
          增加试题
        </Button>
        <Button variant='contained' color='success' onClick={handleAdd}>
          <AddBoxIcon />
          添加问题
        </Button>
        <Link href='/admin/exams'>
          <Button variant='contained' color='secondary'>
            <ArrowBackIcon />
            全部试题
          </Button>
        </Link>
      </Stack>
      <Stack sx={{ mt: 2 }}>
        <TextField
          required
          type='text'
          label='试卷名称'
          defaultValue={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          required
          type='text'
          label='试卷分类'
          defaultValue={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
        <TextField
          type='text'
          required
          label='试卷描述'
          defaultValue={description}
          multiline
          rows={2}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </Stack>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
      {editItem ? (
        <EditPaperDialog
          editItem={editItem}
          setEditItem={setEditItem}
          open={open}
          setOpen={setOpen}
          setQuestion={setQuestion}
          question={question}
        />
      ) : null}
    </Box>
  );
};

export default AddExam;
