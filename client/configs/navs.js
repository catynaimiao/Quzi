import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";
import ModeIcon from "@mui/icons-material/Mode";

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
  { href: "/dashboard", name: "DashBoard" },
  { href: "#", name: "Services" },
  { href: "#", name: "Contact Us" },
];

export const ActiveLink = (selected) => {
  return links.map((item) => {
    item.actived = item.name === selected;
    return item;
  });
};
