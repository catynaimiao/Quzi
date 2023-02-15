import { Typography, Stack, Box, Button } from "@mui/material";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from 'next/link'

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#122c34",
      darker: "#398EA7",
    },
  },
});

const Home = () => {
  return (
    <>
      <Head>
        <title>QuizExam</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            p: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Stack spacing={2}>
            <Typography variant='h2' component='h2'>
              QuizExam
            </Typography>
            <Typography variant='h2' component='p'>
              内部考试考试系统
            </Typography>
            <Box>
              <Link href='/dashboard'>
                <Button variant='contained' size='large'>
                  进入考试
                </Button>
              </Link>
            </Box>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Home;
