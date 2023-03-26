import { useAuth } from "../client/services/auth/auth";
import Head from "next/head";
import TopBanner from "../client/components/global/TopBanner";
import { useEffect, useState } from "react";
import ExamsList from "../client/components/pages/home/ExamsList";
import SidebarLayout from "../client/components/global/SidebarLayouts";

const links = [
  { href: "/", name: "Home" },
  { href: "/dashboard", name: "DashBoard", actived: true },
  { href: "#", name: "Services" },
  { href: "#", name: "Contact Us" },
];

const Slider = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold text-gray-800'>Slider</h1>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>QuziExam 考试系统-考生菜单</title>
      </Head>
      <TopBanner links={links} title={"仪表盘菜单"} />
      <SidebarLayout Sidebar={<Slider/>}>
        <ExamsList />
      </SidebarLayout>
    </>
  );
};

export default Dashboard;
