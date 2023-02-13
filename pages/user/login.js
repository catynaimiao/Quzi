import React, { useState } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Box, Page, Stack, Alert } from "@mui/material";
import axios from "axios";

const containerStyle = { width: "100%", height: "80vh" };
const formStyle = {
  m: "auto",
  pt: 10,
  width: "80%",
};

const Login = () => {
  const router = useRouter();
  const [errormessage, setErrormessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/login", { username, password });
      localStorage.setItem(
        "quizexam",
        JSON.stringify({ ...response.data, username }),
      );
      router.push("/");
    } catch (error) {
      const data = error.response.data;
      setErrormessage(data.message);
      setTimeout(() => {
        setErrormessage(null);
      }, 2500);
    }
  };

  return (
    <Box component={Page} sx={containerStyle}>
      <form noValidate autoComplete='off'>
        <Stack sx={formStyle} spacing={2}>
          <TextField
            id='username'
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id='password'
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={handleSubmit}>
            Login
          </Button>
          {errormessage && <Alert severity='error'>{errormessage}</Alert>}
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
