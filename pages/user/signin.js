import Head from "next/head";
import { useRouter } from "next/router";

import { useState } from "react";
import { loginService, login } from "../../client/services/auth/auth";
import CostumAlert from "../../client/components/alert/CostumAlert";

// route href
const baseUrl = "/user";
const RegisterHref = baseUrl + "/signup";

// 登录页面
const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  // 通知
  const [invalid, setInvalid] = useState("invisible");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const setSuccessMessage = (message) => {
    setSuccess(true);
    setMessage(message);
  };
  const setErrorMessage = (message) => {
    setSuccess(false);
    setMessage(message);
  };
  // 通知结束

  const handleForget = (event) => {
    event.preventDefault();
    alert("忘记密码请暂时联系管理员。");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      const response = await loginService(email, password);
      login(response);
      setSuccessMessage("登录成功 跳转页面...");
      router.push("./check");
    } catch (error) {
      if (error.message) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <Head>
        <title>登录系统</title>
      </Head>
      <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <span className='mb-6 flex items-center bg-gradient-to-r from-pink-500  to-violet-500 bg-clip-text text-3xl font-semibold text-transparent'>
          Quiz Exam
        </span>
        <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          {message ? (
            <CostumAlert
              message={message}
              success={success}
              onClose={() => {
                setMessage("");
              }}
            />
          ) : null}
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
              登录你的考试用户
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              action='#'
              onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  邮箱
                </label>
                <input
                  type='email'
                  name='email'
                  id='count'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                  placeholder='name@company.com'
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  密码
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex h-5 items-center'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600'
                      name='remember'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='remember'
                      className='text-gray-500 dark:text-gray-300'>
                      记住我
                    </label>
                  </div>
                </div>
                <a
                  onClick={handleForget}
                  href='#'
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  忘记密码？
                </a>
              </div>
              <button
                type='submit'
                disabled={success}
                className='w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:bg-gray-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                登录
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                没有考试账户？{" "}
                <a
                  href={RegisterHref}
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
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
