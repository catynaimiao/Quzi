import React, { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";

const CostumAlert = ({ message, success, onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    open && (
      <Alert severity={success ? "success" : "error"} onClose={handleClose}>
        <AlertTitle>{success ? "操作成功" : "操作失败"}</AlertTitle>
        {message}
      </Alert>
    )
  );
};

export default CostumAlert;
