import { Box, TextField, Stack, Button } from "@mui/material";

import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { questions } from "../../../questions";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const question = questions.map((q) => ({ id: q.id, question: q.question }));

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    <Button>添加试题</Button>
  </GridToolbarContainer>
);

const EditExam = () => {
  const handleAction = (event) => {
    console.log(event);
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
          onClick={handleAction}
          label='Delete'
        />,
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={handleAction}
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
      autoComplete='off'>
      <Stack direction='row' spacing={1}>
        <Button variant='contained'>保存</Button>
        <Button variant='contained' color='secondary'>
          删除
        </Button>
      </Stack>
      <Stack>
        <TextField required type='text' label='试卷名称' />
        <TextField required type='text' label='试卷类别' />
        <TextField type='text' required label='试卷描述' multiline rows={2} />
      </Stack>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          components={{
            Toolbar: CustomToolbar,
          }}
          columns={columns}
        />
      </div>
    </Box>
  );
};

export default EditExam;
