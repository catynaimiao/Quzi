import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { TextField, Box, Stack } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState("a");

  const [questionName, setQuestionName] = React.useState("");
  const [xuanxiang_1, setXuanxiang_1] = React.useState("");
  const [xuanxiang_2, setXuanxiang_2] = React.useState("");
  const [xuanxiang_3, setXuanxiang_3] = React.useState("");
  const [xuanxiang_4, setXuanxiang_4] = React.useState("");

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    const question = {
      name: questionName,
      option1: xuanxiang_1,
      Option2: xuanxiang_2,
      option3: xuanxiang_3,
      option4: xuanxiang_4,
      answer: select,
    };
    console.log(question);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              题目编辑
            </Typography>
            <Button autoFocus color='inherit' onClick={handleClose}>
              保存更改
            </Button>
          </Toolbar>
        </AppBar>
        <form>
          <Box sx={{ p: 4, display: "flex", gap: 2, flexDirection: "column" }}>
            <TextField
              autoFocus
              label='题目名称'
              variant='outlined'
              value={questionName}
              onChange={(event) => {
                setQuestionName(event.target.value);
              }}
            />
            <Stack direction='row' spacing={2}>
              <TextField
                label='题目类别'
                disabled
                variant='outlined'
                defaultValue='quiz'
                sx={{ width: "40%" }}
              />
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>正确答案</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={select}
                  label='正确答案'
                  onChange={handleChange}>
                  <MenuItem value='a'>选项1</MenuItem>
                  <MenuItem value='b'>选项2</MenuItem>
                  <MenuItem value='c'>选项3</MenuItem>
                  <MenuItem value='d'>选项4</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <TextField
              label='选项1'
              variant='outlined'
              value={xuanxiang_1}
              onChange={(event) => {
                setXuanxiang_1(event.target.value);
              }}
            />
            <TextField
              label='选项2'
              variant='outlined'
              value={xuanxiang_2}
              onChange={(event) => {
                setXuanxiang_2(event.target.value);
              }}
            />
            <TextField
              label='选项3'
              variant='outlined'
              value={xuanxiang_3}
              onChange={(event) => {
                setXuanxiang_3(event.target.value);
              }}
            />
            <TextField
              label='选项4'
              variant='outlined'
              value={xuanxiang_4}
              onChange={(event) => {
                setXuanxiang_4(event.target.value);
              }}
            />
          </Box>
        </form>
      </Dialog>
    </div>
  );
}
