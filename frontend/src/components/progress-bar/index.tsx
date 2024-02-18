import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import useMounted from "@/hooks/use-mounted";

NProgress.configure({ showSpinner: false });

export default function ProgressBar() {
  const mounted = useMounted();

  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      NProgress.start();
      setVisible(true);
    }
    if (visible) {
      NProgress.done();
      setVisible(false);
    }
    if (!visible && mounted) {
      setVisible(false);
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
  }, [pathname, mounted]);

  return <div className="progress-bar"></div>;
}
