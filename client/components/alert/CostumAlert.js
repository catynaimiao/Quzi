import React, { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import PropTypes from "prop-types";

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

CostumAlert.prototype = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default CostumAlert;
