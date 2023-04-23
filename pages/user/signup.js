import Head from "next/head";
import { useState } from "react";
import { registerService } from "../../client/services/auth/auth";
import CostumAlert from "../../client/components/alert/CostumAlert";

// route href
const baseUrl = "/user";
const LoginHref = baseUrl + "/signin";

// 注册页面
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "repassword" && formData.password) {
      if (formData.password !== value) {
        setInvalid("");
      } else {
        setInvalid("invisible");
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = formData;
    if (!invalid) {
      setErrorMessage("两次密码不一致");
    } else {
      try {
        const response = await registerService(name, email, password);
        setSuccessMessage("注册成功");
      } catch (error) {
        if (error.message) {
          setErrorMessage(error.message);
        }
      }
    }
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <Head>
        <title>注册用户</title>
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
              注册你的考试用户
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='name'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  昵称
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                  placeholder='nickname'
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  注册邮箱
                </label>
                <input
                  type='email'
                  name='email'
                  id='count'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                  placeholder='name@company.com'
                  required
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
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor='repassword'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                  确认密码
                </label>
                <input
                  type='password'
                  name='repassword'
                  id='repassword'
                  placeholder='••••••••'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                  required
                  onChange={handleInputChange}
                />
                <p className={`text-sm font-light text-red-700 ${invalid}`}>
                  *两次密码不一致
                </p>
              </div>
              <button
                type='submit'
                className='w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                注册账户
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                已有考试账户？{" "}
                <a
                  href={LoginHref}
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
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
