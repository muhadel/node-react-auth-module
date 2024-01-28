import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";

import useAuth from "@/hooks/use-auth";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { setCurrentUser } from "@/redux/auth/auth-actions";

export default function AppRouter() {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentUser());
  }, [dispatch]);

  const router = createBrowserRouter([isAuthenticated ? PrivateRoute() : {}, ...PublicRoute()]);

  return <RouterProvider router={router} />;
}
