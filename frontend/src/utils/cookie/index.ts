type CookieOptions = {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  [key: string]: any;
};

type JsonCookie<T> = {
  [key: string]: T;
};

export type CookieUtils = {
  ACCESS_TOKEN_COOKIE_NAME: string;
  setCookie: (name: string, value: string, options?: CookieOptions) => void;
  getCookie: (name: string) => string | undefined;
  removeCookie: (name: string, options?: CookieOptions) => void;
  parseJsonCookie: <T>(name: string) => T | null;
  setJsonCookie: <T>(name: string, value: JsonCookie<T>, options?: CookieOptions) => void;
};

import Cookies from "js-cookie";

const COOKIE_EXPIRATION_DAYS = 7;

const cookieUtils: CookieUtils = {
  ACCESS_TOKEN_COOKIE_NAME: "session-token",

  setCookie: (name, value, options) => {
    Cookies.set(name, value, { expires: options?.expires || COOKIE_EXPIRATION_DAYS, ...options });
  },

  getCookie: (name) => Cookies.get(name),

  removeCookie: (name, options) => {
    Cookies.remove(name, options);
  },

  parseJsonCookie: (name) => {
    const cookieValue = Cookies.get(name);
    return cookieValue ? JSON.parse(cookieValue) : null;
  },

  setJsonCookie: (name, value, options) => {
    Cookies.set(name, JSON.stringify(value), { expires: options?.expires || COOKIE_EXPIRATION_DAYS, ...options });
  }
};

export default cookieUtils;
