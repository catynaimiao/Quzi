import { useRouter } from "next/router";

import TopBanner from "../../../../client/components/global/TopBanner";
import { ActiveLink } from "../../../../client/configs/navs";

import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";

const utils_menu_button = [
  {
    icon: <AddchartOutlinedIcon />,
    content: "创建考试",
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

const Main = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className='mx-auto md:container'>
    </div>
  );
};

const PaperView = () => {
  return (
    <div>
      <TopBanner title='考试管理' links={ActiveLink("Admin")} />
      <Main />
    </div>
  );
};

export default PaperView;
