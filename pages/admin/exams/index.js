import {
  AppBar,
  Box,
  Container,
  Typography,
  Button,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  ListItemAvatar,
  Divider,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import Head from "next/head";
import Link from "next/link";

import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";

const PapersList = ({ setPapers, papers, user }) => {
  const handleDelete = (id) => {
    if (id) {
      axios
        .delete(`/api/admin/exams/${id}`, {
          headers: {
            Authorization: user.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const newPapers = papers.filter((paper) => paper.id !== id);
          setPapers(newPapers);
          alert("删除成功");
        })
        .catch((error) => {
          alert(error.message);
          router.push("/admin/exams", undefined, { shallow: true });
        });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <List>
        {papers.map((paper) => (
          <ListItem
            key={paper.title}
            secondaryAction={
              <Stack direction='row' spacing={2}>
                <Link href={`/admin/exams/${paper.id}`}>
                  <IconButton aria-label='edit'>
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => {
                    handleDelete(paper.id);
                  }}>
                  <Delete />
                </IconButton>
              </Stack>
            }>
            <ListItemAvatar>
              <Avatar>
                <ArticleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={paper.title} secondary={paper.description} />
            <Divider />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const Home = () => {
  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("quizexam"));
    //console.log(user.token);
    axios
      .get("/api/admin/exams", {
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      })
      .then((res) => {
        setPapers(res.data);
      });
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
        <title>全部试卷</title>
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
              QuziExam考试系统 全部试卷
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
        <Stack direction='row' spacing={2}>
          <Link href='/admin'>
            <Button variant='outlined' color='error'>
              返回主页
            </Button>
          </Link>
          <Link href='/admin/exams/new'>
            <Button variant='outlined' color='primary'>
              添加试卷
            </Button>
          </Link>
        </Stack>
        <Box
          sx={{
            p: 2,
            my: 2,
            border: "1px solid black",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}>
          <Typography component='h4' variant='h4'>
            全部试卷
          </Typography>
          {papers ? (
            <PapersList papers={papers} setPapers={setPapers} user={user} />
          ) : null}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
