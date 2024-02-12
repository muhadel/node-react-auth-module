import { dotenv } from "@/utils/config";
import cookieUtils from "@/utils/cookie";
import Axios from "axios";

export const axios = Axios.create({ baseURL: `${dotenv.backendUrl}/api` });

// Set token in header if the token is found in the cookies
axios.interceptors.request.use(function (requestConfig) {
  const authToken = cookieUtils.getCookie(dotenv.accessTokenCookieName);
  if (authToken) requestConfig.headers.Authorization = authToken;

  return requestConfig;
});
