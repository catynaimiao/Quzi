import EditExam from "../../../common/components/exam/EditExam";
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

import axios from "axios";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import ADMIN_BASIC_THEME from "../../../common/theme/admin/basic";

const EditExamPage = () => {
  const router = useRouter();
  const { examid } = router.query;

  const [paper, setPaper] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("quizexam"));
    if (examid) {
      axios
        .get(`/api/admin/exams/${examid}`, {
          headers: {
            Authorization: user.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setPaper(response.data);
        })
        .catch((error) => {
          alert(error.message);
          router.push("/admin/exams", undefined, { shallow: true });
        });
      setUser(user);
    }
  }, [examid, router]);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    setUser(null);
  };

  return (
    <ThemeProvider theme={ADMIN_BASIC_THEME}>
      <Box>
        <Head>
          <title>考试系统管理台</title>
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
                QuziExam考试系统 管理台
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
            {paper ? (
              <EditExam paper={paper} user={user} />
            ) : (
              <Typography variant='body1'>加载中...</Typography>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EditExamPage;
