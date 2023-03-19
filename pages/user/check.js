// 登录页面
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { hasLogged, login } from "../../client/services/auth/auth";

// route href
const baseUrl = "/re_user";
const LoginHref = baseUrl + "/signin";
const RegisterHref = baseUrl + "/signup";

//
import Head from "next/head";
import Link from "next/link";

const CheckPage = () => {
  //login();
  const logged = hasLogged();

  return (
    <section class='bg-gray-50 dark:bg-gray-900'>
      <Head>
        <title>用户登录状态</title>
      </Head>
      <div class='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div class='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          <div class='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <div class=' mb-1 bg-gray-50 py-4 text-center dark:bg-gray-800 '>
              <div class='mt-2 mb-4 text-center text-2xl font-medium dark:text-slate-50'>
                {logged ? "已登录" : "未登录"}
              </div>
              {logged ? (
                <div class='mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-green-500'>
                  <LockOpenOutlinedIcon sx={{ fontSize: 32, color: "#fff" }} />
                </div>
              ) : (
                <div class='mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-gray-500'>
                  <LockOutlinedIcon sx={{ fontSize: 32, color: "#fff" }} />
                </div>
              )}
            </div>
            {logged ? (
              <Link href={baseUrl}>
                <button class='w-full rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
                  返回主页
                </button>
              </Link>
            ) : (
              <Link href={LoginHref}>
                <button class='w-full rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                  前往登录
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckPage;
