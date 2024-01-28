import { lazy } from "react";
import LayoutWrapper from "./components/layout/wrapper";
import { routes } from "@/utils/config/routes";

const Home = lazy(() => import("@/pages/home"));
const NotFound = lazy(() => import("@/pages/not-found"));

export default function privateRoutes() {
  return {
    element: <LayoutWrapper />,
    children: [
      { path: routes.home, element: <Home /> },
      { path: "*", element: <NotFound /> }
    ]
  };
}
