import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthReducer from "./auth/auth-slice";

// Custom middleware function for logging actions and states
const loggingMiddleware = (store: any) => (next: any) => (action: any) => {
  const prevState = store.getState();

  const result = next(action);
  const nextState = store.getState();
  console.log({
    Action: action.type,
    State_before_dispatch: prevState,
    State_after_dispatch: nextState
  });
  return result;
};

// Redux store with combined reducers and middleware
export const store = configureStore({
  reducer: { auth: AuthReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggingMiddleware)
});

// Types for dispatch, state, and thunk actions
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
