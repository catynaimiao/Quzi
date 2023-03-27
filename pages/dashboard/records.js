import { SelectedSliderList } from "../../client/configs/navs";
import SliderList from "../../client/components/pages/dashboard/SliderList";
import { ActiveLink } from "../../client/configs/navs";
import SidebarLayout from "../../client/components/global/SidebarLayouts";
import TopBanner from "../../client/components/global/TopBanner";
import Head from "next/head";

const UserView = () => {
  return (
    <>
      <Head>
        <title>考试记录</title>
      </Head>
      <TopBanner links={ActiveLink("DashBoard")} title={"仪表盘菜单"} />
      <SidebarLayout Sidebar={<SliderList list={SelectedSliderList(2)} />}>
        <div className='flex flex-col'>
          <h1>你好</h1>
        </div>
      </SidebarLayout>
    </>
  );
};

export default UserView;
