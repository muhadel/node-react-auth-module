import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";
import { Suspense } from "react";

export default function LayoutWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <>
          <div>loading...</div>
        </>
      }
    >
      <Header />
      {children}

      {/* should be used in parent route elements to render their child route elements.  */}
      <Outlet />
      <Footer />
    </Suspense>
  );
}
