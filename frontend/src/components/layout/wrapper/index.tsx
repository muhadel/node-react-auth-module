import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import ProgressBar from "@/components/progress-bar";

export default function LayoutWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <>
          <div>loading...</div>
        </>
      }
    >
      <ProgressBar />
      <Header />
      {children}

      {/* should be used in parent route elements to render their child route elements.  */}
      <Outlet />
      <Footer />
    </Suspense>
  );
}
