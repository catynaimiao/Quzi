
import { useRouter } from "next/router";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import TopBanner from "../../../client/components/global/TopBanner";

const UsersComponent = () => {
  const router = useRouter();

  const handleCreateUser = () => {
    router.push("/portal/users/create");
  };

  return (
    <div>
      <TopBanner links={ActiveLink("Admin")} title='用户管理' />
      <div className='container mx-auto'>
        <div className='flex flex-row'>
          <Button
            className='bg-primary-400'
            variant='contained'
            onClick={handleCreateUser}>
            新增用户
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

const CreateUserPage = function CreateUser() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 提交创建用户的表单数据，可以将数据发送到后端 API 进行创建操作。
    console.log(user);
    router.push("/");
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          创建用户
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label='姓名'
          name='name'
          value={user.name}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='邮箱'
          name='email'
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='密码'
          name='password'
          type='password'
          value={user.password}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
        />
        <Box sx={{ mt: 2 }}>
          <Button type='submit' variant='contained' color='primary'>
            创建
          </Button>
        </Box>
      </form>
    </Container>
  );
};
