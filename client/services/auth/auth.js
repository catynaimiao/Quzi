import axios from "axios";
// 未来 全局配置变量
const BASE_URL = "http://localhost:3001/api/v1/auth"; // api Request URI

// auth 私有全局变量
let TOKEN = null; // 用户 Bearer Token
let UserInfo = {}; // 用户 个人信息
let UserPageAccessList = []; //用户 页面权限

let _log_state = false;
//

export const hasLogged = () => {
  return _log_state;
}; //登录状态

export const login = () => {
  _log_state = true;
};

export const logout = () => {
  _log_state = false;
};

// 设置 bearer Token
export const setToken = (token) => {
  TOKEN = token;
};

// 获取 bearer Token
export const getToken = () => {
  return TOKEN;
};

// 返回 用户信息
export const getUserInfo = () => {};

/**
 * 返回 用户页面权限
 * @param {string} pageRoute 页面路由
 * @returns
 */
export const getUserPageAccess = (pageRoute) => {
  return UserPageAccessList.find(
    (pageAccessDetail) => pageAccessDetail.route === pageRoute,
  );
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
export const register = async (name, email, password) => {
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
