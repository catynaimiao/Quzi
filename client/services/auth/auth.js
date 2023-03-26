import axios from "axios";
import { useEffect, useState } from "react";
// 未来 全局配置变量
const BASE_URL = "http://localhost:3001/api/v1/auth"; // api Request URI

export const useAuth = () => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const { user } = localAuth();
    setUser(user);
  }, []);
  return { user };
};

export const localAuth = () => {
  if (typeof window !== "undefined") {
    const localAuth = JSON.parse(localStorage.getItem("auth"));
    return localAuth;
  }
  return false;
};

export const login = (auth) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth", JSON.stringify(auth));
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

/**
 * 返回 用户页面权限
 * @param {string} pageRoute 页面路由
 * @returns
 */
export const getUserPageAccess = (pageRoute) => {
  /** */
};

// 登录 service
export const loginService = async (email, password) => {
  try {
    const response = await axios.post(BASE_URL, {
      action: "login",
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // 请求已发送，但状态码不在 2xx 范围内
      console.error(error.response.data);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // 请求已发送，但没有收到响应
      console.error(error.request);
      throw new Error("无法连接到服务器");
    } else {
      // 发生了一些错误，导致请求无法发送
      console.error(error.message);
      throw new Error("请求无法发送");
    }
  }
};

// 注册 service
export const registerService = async (name, email, password) => {
  try {
    const response = await axios.post(BASE_URL, {
      action: "register",
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // 请求已发送，但状态码不在 2xx 范围内
      console.error(error.response.data);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // 请求已发送，但没有收到响应
      console.error(error.request);
      throw new Error("无法连接到服务器");
    } else {
      // 发生了一些错误，导致请求无法发送
      console.error(error.message);
      throw new Error("请求无法发送");
    }
  }
};
