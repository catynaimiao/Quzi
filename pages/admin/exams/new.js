import AddExam from "../../../common/components/exam/AddExam";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import Head from "next/head";
import Link from "next/link";

import ADMIN_BASIC_THEME from "../../../common/theme/admin/basic";

const EditExamPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("quizexam"));
    setUser(user);
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    setUser(null);
  };

  return (
    <ThemeProvider theme={ADMIN_BASIC_THEME}>
      <Box>
        <Head>
          <title>添加试卷</title>
        </Head>
        <AppBar
          position='static'
          sx={{
            backgroundColor: "black",
            color: "#ffffff",
            py: 4,
          }}>
          <Container>
            <Toolbar>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                QuziExam考试系统 添加试卷
              </Typography>
              {!user ? (
                <Link href='/user/login'>
                  <Button color='inherit' variant='outlined'>
                    LOGIN
                  </Button>
                </Link>
              ) : (
                <Button
                  color='inherit'
                  variant='outlined'
                  onClick={handleLogout}>
                  LOGOUT
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
        <Container>
          <Box sx={{ mt: 2 }}>
            <AddExam user={user} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EditExamPage;
