import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/auth-state";
import { signIn, signUp, setCurrentUser, signOut, clearError } from "./auth-actions";
import { CustomError } from "@/types/custom-error";

const initialState: AuthState = {
  data: { user: null, isAuthenticated: false },
  error: {},
  isFetching: false,
  stage: "idle"
};

const authSlice = createSlice({
  name: "AUTH",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * AUTH/SIGN_UP
     */
    builder.addCase(signUp.pending, (state, _) => {
      state.stage = "loading";
      state.isFetching = true;
    });

    builder.addCase(signUp.rejected, (state, action) => {
      const error = action.payload as CustomError;
      const message = error.response?.data?.error?.message || "Something Went wrong";

      state.isFetching = false;
      state.stage = "rejected";
      state.error = { message };
    });

    /**
     * AUTH/SIGN_IN
     */
    builder.addCase(signIn.pending, (state, _) => {
      state.stage = "loading";
      state.isFetching = true;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      const error = action.payload as CustomError;
      const message = error.response?.data?.error?.message || "Something Went wrong";

      state.isFetching = false;
      state.stage = "rejected";
      state.error = { message };
    });

    /**
     *  AUTH/SET_CURRENT_USER
     */
    builder.addCase(setCurrentUser.fulfilled, (state, action) => {
      console.log("AUTH/SET_CURRENT_USER", action.payload);

      if (action.payload) {
        state.data.isAuthenticated = true;
        state.isFetching = false;
        state.data.user = { ...action.payload };
      } else {
        state.data.isAuthenticated = false;
        state.isFetching = false;
        state.data.user = null;
      }
    });

    /**
     *  AUTH/SIGN_OUT
     */
    builder.addCase(signOut.fulfilled, (state, _) => {
      state.data = { user: null, isAuthenticated: false };
      state.error = {};
      state.isFetching = false;
      state.stage = "idle";
    });

    /**
     *  AUTH/CLEAR_ERROR
     */
    builder.addCase(clearError, (state, _) => {
      state.error = {};
      state.isFetching = false;
      state.stage = "idle";
    });
  }
});

export default authSlice.reducer;
