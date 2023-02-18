import {
  Card,
  Box,
  Avatar,
  Stack,
  Typography,
  Divider,
  Chip,
  Switch,
  IconButton,
} from "@mui/material";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import { LocationOn, Edit } from "@mui/icons-material";

const ExamInfoCard = ({ exam }) => (
  <Card sx={{ width: 275, m: 2, p: 2 }}>
    <Stack spacing={0.5}>
      <Typography fontWeight={700}>
        {(exam && exam.title) || "网络错误"}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {(exam && exam.date) || "0000年00月00日"} 考试截止
      </Typography>
      <Box>
        <Chip size='small' label='未完成' />
      </Box>
    </Stack>
  </Card>
);

export default ExamInfoCard;
