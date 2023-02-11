import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  ButtonGroup,
  Container,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { username } = JSON.parse(localStorage.getItem("quizexam") || "{}");
    setUser(username);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <Container maxWidth='sm'>
      <Paper elevation={3} sx={{ padding: 4 }}>
        {user ? (
          <Box>
            <Typography variant='h5'>你好 {user}</Typography>
            <ButtonGroup variant='contained' sx={{ mt: 2 }}>
              <Button>
                <Link href='/exam'>参加考试</Link>
              </Button>
              <Button onClick={handleLogout}>
                退出登录
              </Button>
            </ButtonGroup>
          </Box>
        ) : (
          <Box>
            <Typography variant='h5'>请登录,来参加考试</Typography>
            <Button sx={{ mt: 2 }} variant='contained' onClick={handleLogout}>
              <Link href='/login'>登录</Link>
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
