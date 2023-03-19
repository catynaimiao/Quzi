import Link from "next/link";
import Head from "next/head";

// route href
const baseUrl = "/re_user";
const LoginHref = baseUrl + "/signin";

// 注册页面
const SignUpPage = () => {
  return (
    <section class='bg-gray-50 dark:bg-gray-900'>
      <Head>
        <title>注册用户</title>
      </Head>
      <div class='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <span class='mb-6 flex items-center bg-gradient-to-r from-pink-500  to-violet-500 bg-clip-text text-3xl font-semibold text-transparent'>
          Quiz Exam
        </span>
        <div class='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          <div class='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 class='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
              注册你的考试用户
            </h1>
            <form class='space-y-4 md:space-y-6' action='#'>
              <div>
                <label
                  htmlFor='email'
                  class='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  注册邮箱
                </label>
                <input
                  type='text'
                  name='text'
                  id='count'
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                  placeholder='name@company.com'
                  required=''
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  class='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  密码
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                  required=''
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  class='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  确认密码
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                  required=''
                />
              </div>
              <button
                type='submit'
                class='w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                注册账户
              </button>
              <p class='text-sm font-light text-gray-500 dark:text-gray-400'>
                已有考试账户？{" "}
                <a
                  href={LoginHref}
                  class='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  快速登录
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
