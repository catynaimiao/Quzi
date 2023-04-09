import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";
import ModeIcon from "@mui/icons-material/Mode";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AppsIcon from "@mui/icons-material/Apps";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

// admin links
export const Admin_User_Links = [
  {
    id: 1,
    name: "用户管理",
    href: "/portal/users/users",
    icon: <PeopleIcon />,
  },
  {
    id: 2,
    name: "用户组管理",
    href: "/portal/users/groups",
    icon: <GroupsIcon />,
  },
];

export const Admin_Exam_Links = [
  {
    id: 1,
    name: "考试管理",
    href: "/portal/exams/exams",
    icon: <ModeIcon />,
  },
  {
    id: 2,
    name: "试卷管理",
    href: "/portal/exams/papers",
    icon: <StickyNote2Icon />,
  },
  {
    id: 3,
    name: "题库管理",
    href: "/portal/exams/questions",
    icon: <SubjectIcon />,
  },
];


export const SelectedAdminSliderList = (selected) => {
  return AdminSliderList.map((item) => {
    item.selected = item.id === selected;
    return item;
  });
};

// navlist links
const SliderList = [
  {
    id: 1,
    name: "您与 quziexam",
    href: "/dashboard/user",
    icon: <PersonIcon />,
  },
  {
    id: 2,
    name: "考试记录",
    href: "/dashboard/records",
    icon: <SubjectIcon />,
  },
  {
    id: 3,
    name: "参加考试",
    href: "/dashboard/exams",
    icon: <ModeIcon />,
  },
];

export const SelectedSliderList = (selected) => {
  return SliderList.map((item) => {
    item.selected = item.id === selected;
    return item;
  });
};

// top banner links
const links = [
  { href: "/", name: "Home" },
  { href: "/dashboard/exams", name: "DashBoard" },
  { href: "/portal", name: "Admin" },
];

export const ActiveLink = (selected) => {
  return links.map((item) => {
    item.actived = item.name === selected;
    return item;
  });
};
