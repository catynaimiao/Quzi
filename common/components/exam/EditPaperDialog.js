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
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

import { TextField, Box, Stack } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const EditPaperDialog = ({
  open,
  setOpen,
  editItem,
  setEditItem,
  setQuestion,
  question,
}) => {
  //const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState("a");
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleChangeAnswer = (event) => {
    setEditItem({ ...editItem, anwser: event.target.value });
    setSelect(event.target.value);
  };

  const handleSave = () => {
    const newQuestion = question.map((item) => {
      if (item.id === editItem.id) {
        return editItem;
      } else {
        return item;
      }
    });
    setAlertOpen(true);
    setQuestion(newQuestion);
    setTimeout(() => {
      setAlertOpen(false);
    }, 1500);
  };

  const hanldeChangeOption = (id, newOption) => {
    const newOptions = [...editItem.options].map((option) => {
      if (option.id === id) {
        return { id, option: newOption };
      } else {
        return option;
      }
    });

    setEditItem({ ...editItem, options: newOptions });
  };

  const handleChangeQuestion = (question) => {
    setEditItem({ ...editItem, question });
  };

  const handleClose = () => {
    setOpen(false);
    setAlertOpen(false);
  };

  return (
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
            题目编辑{" > "}题目{editItem.id}
          </Typography>
          <Button autoFocus color='inherit' onClick={handleSave}>
            保存更改
          </Button>
        </Toolbar>
      </AppBar>
      <Collapse in={alertOpen}>
        <Alert
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setAlertOpen(false);
              }}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}>
          保存成功!
        </Alert>
      </Collapse>
      <form>
        <Box sx={{ p: 4, display: "flex", gap: 2, flexDirection: "column" }}>
          <TextField
            autoFocus
            label='题目名称'
            variant='outlined'
            value={editItem.question}
            onChange={(event) => {
              handleChangeQuestion(event.target.value);
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
                onChange={handleChangeAnswer}>
                {editItem.options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    选项{option.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          {editItem.options.map((option) => {
            return (
              <TextField
                label={`选项${option.id}`}
                key={option.id}
                multiline
                variant='outlined'
                value={option.option}
                onChange={(event) => {
                  hanldeChangeOption(option.id, event.target.value);
                }}
              />
            );
          })}
        </Box>
      </form>
    </Dialog>
  );
};

export default EditPaperDialog;
