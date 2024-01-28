import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "@/redux/api-service";
import cookieUtils from "@/utils/cookie";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "@/types/token-payload";
import { SignInRequestDto, SignInResponseDto, SignUpRequestDto, SignUpResponseDto } from "@/types/auth-dto";

export const signUp = createAsyncThunk("AUTH/SIGN_UP", async (args: SignUpRequestDto, thunkAPI) => {
  try {
    const response = await axios.post(`/auth/signup`, args);
    const responseData = response.data as SignUpResponseDto;

    // Set the token in cookies after successful sign-up
    cookieUtils.setCookie(cookieUtils.ACCESS_TOKEN_COOKIE_NAME, responseData.data.token);

    // Dispatch setCurrentUser after successful sign-up
    thunkAPI.dispatch(setCurrentUser());

    return responseData;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const signIn = createAsyncThunk("AUTH/SIGN_IN", async (args: SignInRequestDto, thunkAPI) => {
  try {
    const response = await axios.post(`/auth/signin`, args);
    const responseData = response.data as SignInResponseDto;

    // Set the token in cookies after successful sign-in
    cookieUtils.setCookie(cookieUtils.ACCESS_TOKEN_COOKIE_NAME, responseData.data.token);

    // Dispatch setCurrentUser after successful sign-in
    thunkAPI.dispatch(setCurrentUser());

    return responseData;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const setCurrentUser = createAsyncThunk("AUTH/SET_CURRENT_USER", async (_, thunkAPI) => {
  try {
    // Get the JWT token from cookies
    const authToken = cookieUtils.getCookie(cookieUtils.ACCESS_TOKEN_COOKIE_NAME);

    if (authToken) {
      if (isValidToken(authToken)) {
        // Decode the JWT token to get user information
        const decodedToken: TokenPayload = jwtDecode(authToken);

        // Dispatch an action to set the user in the Redux store
        return thunkAPI.fulfillWithValue(decodedToken);
      } else {
        // Dispatch an action to remove user from store
        return thunkAPI.fulfillWithValue(false);
      }
    } else {
    }
  } catch (error) {
    console.error("Error setting current user:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

const isValidToken = (token: string): boolean => {
  if (token) {
    // Decode the token to get expiration time
    const decodedToken: TokenPayload = jwtDecode(token);
    const expireTime = decodedToken.exp;
    const currentTime = Date.now() / 1000;

    // Return true if the token is still valid, otherwise false
    return currentTime < expireTime;
  }
  return false;
};

export const signOut = createAsyncThunk("AUTH/SIGN_OUT", async (_, thunkAPI) => {
  try {
    // Delete the JWT token from cookies
    cookieUtils.removeCookie(cookieUtils.ACCESS_TOKEN_COOKIE_NAME);

    // Dispatch setCurrentUser after successful sign-in
    thunkAPI.dispatch(setCurrentUser());
  } catch (error) {
    console.error("Error setting current user:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const clearError = createAction("AUTH/CLEAR_ERROR");
