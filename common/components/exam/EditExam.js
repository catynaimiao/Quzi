import { Box, TextField, Stack } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { questions } from "../../../questions";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const question = questions.map((q) => ({ id: q.id, question: q.question }));

const EditExam = () => {
  const handleAction = () => {
    console.log("yes");
  };
  const rows = question;

  const columns = [
    { field: "id", type: "number", headerName: "id", width: 40 },
    { field: "question", headerName: "题目", width: 600 },
    {
      field: "actions",
      type: "actions",
      headerName: "操作",
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={handleAction(params.id)}
          label='Delete'
        />,
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={handleAction(params.id)}
          label='Edit'
        />,
      ],
    },
  ];
  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete='off'>
      <div>
        <Stack>
          <TextField required label='试卷名称' defaultValue='Hello World' />
          <TextField required label='试卷类别' defaultValue='Hello World' />
        </Stack>
      </div>
      <div>
        <TextField
          required
          label='试卷描述'
          multiline
          rows={2}
          defaultValue='Hello World'
        />
      </div>
      <div style={{ height: 400, width: 800 }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Box>
  );
};

export default EditExam;
