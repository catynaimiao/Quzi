import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TextField, Box, Stack } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Box sx={{ p: 4, display: "flex", gap: 2 }}>
            <TextField autoFocus label='题目名称' variant='standard' />
            <TextField
              label='题目类别'
              disabled
              variant='standard'
              defaultValue='quiz'
              sx={{ width: 120 }}
            />
          </Box>
        </form>
      </Dialog>
    </div>
  );
}
