import Head from "next/head";
import TopBanner from "../client/components/global/TopBanner";
import TimgBase from "../client/components/pages/home/TimgBase";
import timg from "../assets/images/timg.avif";
import { localAuth } from "../client/services/auth/auth";
import { useEffect, useState } from "react";
import { ActiveLink } from "../client/configs/navs";

const Home = () => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const { user } = localAuth();
    setUser(user);
  }, []);

  return (
    <>
      <Head>
        <title>QuziExam 考试系统</title>
      </Head>
      <TopBanner links={ActiveLink("Home")} title={"考试系统"} />
      <TimgBase
        imagSrc={timg}
        title='考试系统'
        subtitle='这个系统很牛逼,全球第一牛逼'
        user={user}
      />
    </>
  );
};

export default Home;
