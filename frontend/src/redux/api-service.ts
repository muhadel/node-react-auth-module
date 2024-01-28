import cookieUtils from "@/utils/cookie";
import Axios from "axios";

const baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const axios = Axios.create({ baseURL });

// Set token in header if the token is found in the cookies
axios.interceptors.request.use(function (config) {
  const authToken = cookieUtils.getCookie(cookieUtils.ACCESS_TOKEN_COOKIE_NAME);
  if (authToken) {
    config.headers.Authorization = authToken;
  }

  return config;
});
