import { Navigate } from "react-router-dom";
import SignIn from "@/pages/auth/signin";
import SignUp from "@/pages/auth/signup";
import { routes } from "@/utils/config/routes";

export default function publicRoutes() {
  return [
    { path: routes.signIn, element: <SignIn /> },
    { path: routes.signUp, element: <SignUp /> },
    { path: "*", element: <Navigate to={routes.signIn} replace /> }
  ];
}
