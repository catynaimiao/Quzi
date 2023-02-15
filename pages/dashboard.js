import {
  AppBar,
  Box,
  Container,
  Typography,
  Button,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";

const Dashboard = () => {
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
    <Box>
      <Head>
        <title>{user ? `${user.name}的考试主页` : `考试系统`}</title>
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
              QuizExam考试系统
            </Typography>
            {!user ? (
              <Link href='/user/login'>
                <Button color='inherit' variant='outlined'>
                  LOGIN
                </Button>
              </Link>
            ) : (
              <Button color='inherit' variant='outlined' onClick={handleLogout}>
                LOGOUT
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Box sx={{ p: 2, my: 2 }}>
          <Typography variant='body1'>
            {user ? `您好,${user.name}。` : `您好,请登录考试系统。`}
          </Typography>
        </Box>
        <Typography fontWeight={700}>你的所有考试</Typography>
        <Box sx={{ p: 2, my: 2, border: "1px solid black" }}></Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
