import TopBanner from "../../../client/components/global/TopBanner";
import { ActiveLink } from "../../../client/configs/navs";

import useSWR from "swr";
import Link from "next/link";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import axios from "axios";
import { useEffect, useState } from "react";

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

const PaperCard = ({ paper }) => {
  return (
    <Link href={`/portal/exams/papers/${paper.id}`}>
      <div className='group flex rounded-xl bg-primary-50 drop-shadow hover:bg-primary-400'>
        <div className='w-64'>
          <div className='text-bas space-y-1 p-4 text-left'>
            <p className='text-lg font-bold text-primary-800 group-hover:text-primary-50'>
              {paper.name ? paper.name : "未命名"}
            </p>
            <p className='text-lg text-primary-500 group-hover:text-primary-100'>
              {paper.creator}
            </p>
            <div className='font-medium'>
              <div className='font-bold text-sky-500 group-hover:text-sky-200'>
                {paper.category ? paper.category : "未分类"}
              </div>
            </div>
            <div className='flex justify-between text-base '>
              <p className='text-primary-400 group-hover:text-primary-100'>
                {paper.status}
              </p>
              <p className='text-primary-400 group-hover:text-primary-100'>
                <span className='font-bold text-primary-500 group-hover:text-primary-50'>
                  {paper.questions.length}
                </span>
                道题
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PaperList = ({ papers }) => {
  return (
    <div className='mt-4 flex justify-start gap-4 overflow-scroll py-4'>
      {papers.map((paper) => (
        <PaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
};

const Main = () => {
  const fetcher = async (url) => {
    const auth = await JSON.parse(localStorage.getItem("auth"));
    const { token } = auth;
    return axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data);
  };
  const { data } = useSWR("/api/v1/papers/papers", fetcher);

  const [papers, setPapers] = useState([]);

  useEffect(() => {
    if (data) {
      setPapers(data.data);
    }
  }, [data]);

  const utils_menu_button = [
    {
      icon: <AddBoxOutlinedIcon />,
      content: "创建考试",
      handler: async () => {
        const auth = await JSON.parse(localStorage.getItem("auth"));
        const { token } = auth;
        const newPaper = await axios.post(
          "/api/v1/papers/createnew",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setPapers([...papers, newPaper.data.data]);
      },
    },
  ];

  return (
    <div className='mx-auto md:container'>
      <UtilsList list={utils_menu_button} />
      {data && <PaperList papers={papers} />}
    </div>
  );
};

const PapersView = () => {
  return (
    <div>
      <TopBanner title='考试管理' links={ActiveLink("Admin")} />
      <Main />
    </div>
  );
};

export default PapersView;
