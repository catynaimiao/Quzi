import TopBanner from "../../../client/components/global/TopBanner";
import { ActiveLink } from "../../../client/configs/navs";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";

const utils_menu_button = [
  {
    icon: <AddBoxOutlinedIcon />,
    content: "添加试卷",
    handler: () => {},
  },
];

const UtilsList = ({ list }) => {
  return (
    <div className='flex w-full gap-2'>
      {list.map((item) => (
        <button
          key={item.content}
          onClick={item.handler}
          className='group relative rounded bg-primary-50 px-6 py-2 text-primary-700 shadow  hover:bg-primary-100'>
          <span className='absolute left-0 top-0 flex h-full w-0 flex-nowrap items-center justify-center overflow-hidden whitespace-nowrap rounded bg-primary-100 transition-all duration-300 group-hover:w-full'>
            {item.icon}
            {item.content}
          </span>
          <span className='tracking-wider'>{item.content}</span>
        </button>
      ))}
    </div>
  );
};

const papers = [
  {
    name: "试卷1",
    category: "前端",
    questions: ["id1", "id2"],
    creator: "id1",
    modifier: "id1",
    duration: 120,
    startTime: "2021-10-10",
    endTime: "2021-10-10",
    status: "未发布",
  },
  {
    name: "试卷2",
    category: "后端",
    questions: ["id1", "id2"],
    creator: "id1",
    modifier: "id1",
    duration: 120,
    startTime: "2021-10-10",
    endTime: "2021-10-10",
    status: "未发布",
  },
];

const PaperCard = ({ paper }) => {
  return (
    <div className="">
    </div>
  )
};

const PaperList = () => {
  return <div></div>;
};

const Main = () => {
  return (
    <div className='mx-auto md:container'>
      <UtilsList list={utils_menu_button} />
      <PaperList />
    </div>
  );
};

const PapersView = () => {
  return (
    <div>
      <TopBanner title='试卷管理' links={ActiveLink("Admin")} />
      <Main />
    </div>
  );
};

export default PapersView;
