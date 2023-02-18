import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import ADMIN_BASIC_THEME from "../../theme/admin/basic";
import EditExam from "../exam/EditExam";

function a11yProps(index) {
  return {
    id: `exam-tab-${index}`,
    "aria-controls": `exam-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AllExams = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={ADMIN_BASIC_THEME}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label='exam tabs'>
            <Tab label='当前考试' {...a11yProps(0)} />
            <Tab label='安排考试' {...a11yProps(1)} />
            <Tab label='试卷编辑' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          内容3
        </TabPanel>
        <TabPanel value={value} index={1}>
          内容2
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EditExam />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default AllExams;
