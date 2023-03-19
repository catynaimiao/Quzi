import Head from "next/head";
import { useState } from "react";
import { loginService } from "../../client/services/auth/auth";

// route href
const baseUrl = "/re_user";
const RegisterHref = baseUrl + "/signup";

// 登录页面
const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleForget = (event) => {
    event.preventDefault();
    alert("忘记密码请暂时联系管理员。");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    const response = await loginService(email, password);
    console.log(response);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <section class='bg-gray-50 dark:bg-gray-900'>
      <Head>
        <title>登录系统</title>
      </Head>
      <div class='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <span class='mb-6 flex items-center bg-gradient-to-r from-pink-500  to-violet-500 bg-clip-text text-3xl font-semibold text-transparent'>
          Quiz Exam
        </span>
        <div class='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          <div class='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 class='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
              登录你的考试用户
            </h1>
            <form
              class='space-y-4 md:space-y-6'
              action='#'
              onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='email'
                  class='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  账号密码
                </label>
                <input
                  type='email'
                  name='email'
                  id='count'
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                  placeholder='name@company.com'
                  required={true}
                  value={formData.email}
                  onChange={handleInputChange}
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
                  required={true}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div class='flex items-center justify-between'>
                <div class='flex items-start'>
                  <div class='flex h-5 items-center'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      class='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600'
                      name='remember'
                    />
                  </div>
                  <div class='ml-3 text-sm'>
                    <label
                      htmlFor='remember'
                      class='text-gray-500 dark:text-gray-300'>
                      记住我
                    </label>
                  </div>
                </div>
                <a
                  onClick={handleForget}
                  href='#'
                  class='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  忘记密码？
                </a>
              </div>
              <button
                type='submit'
                class='w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                登录
              </button>
              <p class='text-sm font-light text-gray-500 dark:text-gray-400'>
                没有考试账户？{" "}
                <a
                  href={RegisterHref}
                  class='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  申请注册
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
