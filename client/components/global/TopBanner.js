import PropTypes from "prop-types";
import Link from "next/link";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useUserLocal = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("auth"));
    if (local) {
      setUser(local);
    }
  }, []);
  console.log(user);
  return user;
};

const useLogout = () => {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("auth");
    router.push("/");
    router.reload();
  };
  return logout;
};

const useLogin = () => {
  const router = useRouter();
  const login = () => {
    router.push("/user/signin");
  };
  return login;
};

const TopBanner = ({ title, links }) => {
  const user = useUserLocal();
  const logout = useLogout();
  const login = useLogin();

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className='mb-4 w-full py-2'>
      <div className='container mx-auto flex items-center justify-between py-2'>
        <h1 className='border-l-2 border-primary-900 pl-2 text-lg font-bold text-primary-900 '>
          {title}
        </h1>
        <button className='block rounded-full p-2  text-primary-900 hover:bg-primary-50 lg:hidden'>
          {show ? (
            <CloseIcon onClick={toggleShow} />
          ) : (
            <MenuIcon onClick={toggleShow} />
          )}
        </button>
        <div className='hidden flex-row gap-4 lg:flex lg:items-center'>
          <nav className='hidden lg:flex lg:items-center'>
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={
                  link.actived
                    ? "block rounded-lg px-4 py-2 font-medium text-gray-400 underline underline-offset-4 hover:bg-primary-50 hover:text-gray-500 lg:ml-4 lg:inline-block"
                    : "block rounded-lg px-4 py-2 font-medium text-gray-400 hover:bg-primary-50 hover:text-gray-500 lg:ml-4 lg:inline-block"
                }>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className='relative overflow-hidden hover:overflow-visible'>
            <button className='peer'>
              <AccountCircleIcon className='peer: rounded-full bg-gray-200 text-[42px] text-primary-300' />
            </button>
            <div className='absolute right-0 z-10 w-32 translate-x-[500px] justify-center rounded  bg-primary-900 opacity-0 transition duration-500 ease-in-out hover:translate-x-0 hover:opacity-100 peer-hover:translate-x-0 peer-hover:opacity-100'>
              {user && (
                <div className='border-b py-1 text-center text-primary-50'>
                  你好,{user.user.name}
                </div>
              )}
              <button
                onClick={user ? logout : login}
                className='w-full rounded py-2 font-medium text-primary-50 hover:bg-primary-300'>
                {user ? "退出登录" : "前往登录"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {show ? (
        <div className='container mx-auto w-full'>
          <nav className='flex flex-col lg:hidden lg:items-center'>
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={
                  link.actived
                    ? " ml-4 inline-block rounded-lg px-4 py-2 font-medium text-gray-400 underline underline-offset-4 hover:bg-primary-50 hover:text-gray-500"
                    : " ml-4 inline-block rounded-lg px-4 py-2 font-medium text-gray-400 hover:bg-primary-50 hover:text-gray-500"
                }>
                {link.name}
              </Link>
            ))}
            {!user ? (
              <button
                onClick={login}
                className='ml-4 inline-block border-t px-4 py-2 text-left font-medium text-gray-400 hover:rounded-lg hover:bg-primary-50 hover:text-gray-500'>
                前往登录
              </button>
            ) : (
              <button
                onClick={logout}
                className='ml-4 inline-block border-t px-4 py-2 text-left font-medium text-gray-400 hover:rounded-lg hover:bg-primary-50 hover:text-gray-500'>
                退出登录
              </button>
            )}
          </nav>
        </div>
      ) : null}
    </div>
  );
};

TopBanner.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
};

export default TopBanner;
