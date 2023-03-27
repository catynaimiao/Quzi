import { SelectedSliderList } from "../../client/configs/navs";
import SliderList from "../../client/components/pages/dashboard/SliderList";
import { ActiveLink } from "../../client/configs/navs";
import SidebarLayout from "../../client/components/global/SidebarLayouts";
import ExamsList from "../../client/components/pages/dashboard/exams/ExamList";
import TopBanner from "../../client/components/global/TopBanner";

import Head from "next/head";
import { useAuth } from "../../client/services/auth/auth";

const UserView = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>参加考试</title>
      </Head>
      <TopBanner links={ActiveLink("DashBoard")} title={"仪表盘菜单"} />
      <SidebarLayout Sidebar={<SliderList list={SelectedSliderList(3)} />}>
        <ExamsList user={user} />
      </SidebarLayout>
    </>
  );
};

export default UserView;
