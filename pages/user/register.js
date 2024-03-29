import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  Button,
  Box,
  Page,
  Stack,
  Alert,
  Typography,
} from "@mui/material";
import axios from "axios";
import Head from "next/head";

import { ThemeProvider } from "@mui/material/styles";
import ADMIN_BASIC_THEME from "../../common/theme/admin/basic";

const containerStyle = { width: "100%", height: "80vh" };

const formStyle = {
  m: "auto",
  width: "80%",
};

const Login = () => {
  const router = useRouter();
  const [errormessage, setErrormessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [helperText, setHelperText] = useState(null);

  useEffect(() => {
    if (repassword !== password) {
      setHelperText("两次密码不一致");
    } else {
      setHelperText(null);
    }
  }, [password, repassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!helperText) {
        const response = await axios.post("/api/user/register", {
          name,
          username,
          password,
          phone,
        });
        localStorage.setItem(
          "quizexam",
          JSON.stringify({ ...response.data, username }),
        );
        router.push("/");
      } else {
        throw new Error("请检查你的填写");
      }
    } catch (error) {
      const message = error.message; //error.response.data.message;

      if (message === "Request failed with status code 401") {
        setErrormessage(error.response.data.error);
      } else {
        setErrormessage(message);
      }

      setTimeout(() => {
        setErrormessage(null);
      }, 2500);
    }
  };

  return (
    <ThemeProvider theme={ADMIN_BASIC_THEME}>
      <Head>
        <title>注册账户</title>
      </Head>
      <Typography variant='h4' textAlign='center' sx={{ my: 2, color: "#181823" }}>
        注册考试用户
      </Typography>
      <Box component={Page} sx={containerStyle}>
        <form noValidate autoComplete='off'>
          <Stack sx={formStyle} spacing={2}>
            <TextField
              id='name'
              label='姓名'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id='username'
              label='用户名'
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id='password'
              label='密码'
              type='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id='repassword'
              error={!!helperText}
              helperText={helperText}
              label='重复密码'
              type='password'
              required
              value={repassword}
              onChange={(e) => {
                setRepassword(e.target.value);
              }}
            />
            <TextField
              id='phone'
              label='电话号码'
              type='number'
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={handleSubmit}>
              注册用户
            </Button>
            {errormessage && <Alert severity='error'>{errormessage}</Alert>}
          </Stack>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
