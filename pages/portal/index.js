import TopBanner from "../../client/components/global/TopBanner";
import {
  ActiveLink,
  Admin_Exam_Links,
  Admin_User_Links,
} from "../../client/configs/navs";
import Head from "next/head";
import Link from "next/link";

const DashBoardCard = ({ name, href, icon }) => {
  return (
    <Link href={href}>
      <div className='col-span-1 m-2 flex h-32 flex-col  items-center justify-center rounded-lg bg-primary-50 shadow-md hover:bg-primary-100 sm:m-0'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-50'>
          <i className='text-2xl text-primary-400'>{icon}</i>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-xl font-bold text-primary-700'>{name}</h1>
        </div>
      </div>
    </Link>
  );
};

const DashBoardCardList = ({ list, title }) => {
  return (
    <div className='container mx-auto'>
      <div>
        <h1 className='text-md mb-2 mt-4 font-bold text-primary-800'>
          {title}
        </h1>
      </div>
      <div className='grid  grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
        {list.map((item) => (
          <DashBoardCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

const UserView = () => {
  return (
    <>
      <Head>
        <title>管理员控制台</title>
      </Head>
      <TopBanner links={ActiveLink("Admin")} title={"管理员仪表盘"} />
      <DashBoardCardList list={Admin_User_Links} title='用户类' />
      <DashBoardCardList list={Admin_Exam_Links} title='考试类' />
    </>
  );
};

export default UserView;
