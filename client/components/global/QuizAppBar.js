import {
  AppBar,
  Container,
  Typography,
  Button,
  Toolbar,
} from "@mui/material";

import PropTypes from "prop-types";

const ExamAppBar = (props) => {
  return (
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
            {props.title}
          </Typography>
          {!props.logged ? (
            <Button
              color='inherit'
              variant='outlined'
              onClick={props.handleLogin}>
              LOGIN
            </Button>
          ) : (
            <Button
              color='inherit'
              variant='outlined'
              onClick={props.handleLogout}>
              LOGOUT
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

ExamAppBar.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  logged: PropTypes.bool,
};

export default ExamAppBar;
