import {
  AppBar,
  Box,
  Container,
  Typography,
  Button,
  Toolbar,
  Chip,
} from "@mui/material";

import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [examinees, setExaminees] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("quizexam"));
    setUser(user);

    if (user) {
      axios
        .get(`/api/admin/examinee`, {
          headers: {
            Authorization: user.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setExaminees(response.data);
        });
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    setUser(null);
  };

  return (
    <Box>
      <Head>
        <title>考试系统管理台 考生管理</title>
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
              QuziExam考试系统 考生管理
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
            {user && `您好,${user.name} 管理员。`}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            my: 2,
            border: "1px solid black",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}>
          {examinees.map((examinee) => (
            <Box key={examinee.id}>
              <Typography variant='h4'>
                {examinee.name} <Chip label={examinee.auth || "User"} />
              </Typography>
              <Typography variant='body2'>{examinee.phone}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
