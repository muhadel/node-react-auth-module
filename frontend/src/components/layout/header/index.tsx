import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { PiArrowLineRight, PiUserCirclePlus } from "react-icons/pi";
import { PiSunBold, PiMoonBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { routes } from "@/utils/config/routes";
import { siteConfig } from "@/utils/config/site.config";
import useAuth from "@/hooks/use-auth";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useTheme } from "@/hooks/use-theme";
import { signOut } from "@/redux/auth/auth-actions";
import { MODE_OPTIONS } from "@/utils/config/enums";

function NavLink({
  href,
  children
}: React.PropsWithChildren<{
  href: string;
}>) {
  const pathname = useLocation().pathname;
  const { theme } = useTheme();

  function isActive(href: string) {
    if (pathname === href) {
      return true;
    }
    return false;
  }

  return (
    <Link
      to={href}
      className={`inline-flex items-center gap-x-1 rounded-3xl p-2 py-1 text-sm font-medium transition-colors md:px-4 md:py-2.5 ${theme === MODE_OPTIONS.LIGHT ? "text-gray-700" : "text-white"} ${
        isActive(href) ? (theme === MODE_OPTIONS.LIGHT ? "bg-gray-200 text-gray-900" : "bg-gray-800 text-white") : ""
      }`}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const { isAuthenticated, user } = useAuth();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const [isDarkModeChecked, setIsDarkModeChecked] = useState(theme === MODE_OPTIONS.DARK);

  const handleSignOut = () => {
    dispatch(signOut());
    navigate(routes.home);
  };

  const handleSwitchChange = () => {
    const newTheme = theme === MODE_OPTIONS.LIGHT ? MODE_OPTIONS.DARK : MODE_OPTIONS.LIGHT;

    setTheme(newTheme);
    setIsDarkModeChecked(!isDarkModeChecked);
  };

  return (
    <header className="flex items-center justify-between p-4 lg:px-16 lg:py-6 2xl:px-24">
      <Link to={"/"}>
        <img src={siteConfig.logo} alt={siteConfig.title} className="dark:invert" />
      </Link>

      <div className="flex items-center space-x-2 md:space-x-4">
        {!isAuthenticated ? (
          <>
            <NavLink href={routes.signIn}>
              <PiArrowLineRight className="h-4 w-4 " />
              <span>Login</span>
            </NavLink>
            <NavLink href={routes.signUp}>
              <PiUserCirclePlus className="h-4 w-4" />
              <span>Sign Up</span>
            </NavLink>
          </>
        ) : (
          <>
            {user && user?.firstName && (
              <div>
                Hi, <span className="font-medium">{user?.firstName}</span>
              </div>
            )}

            <Button rounded="pill" variant="flat" className={theme === MODE_OPTIONS.LIGHT ? "bg-gray-200 text-gray-900" : "bg-gray-800 text-white"} onClick={handleSignOut}>
              <AiOutlineLogout className="h-4 w-4 mr-2" />
              <span>Log out</span>
            </Button>
          </>
        )}
        <Button rounded="pill" variant="outline" onClick={handleSwitchChange} title={`Switch between dark and light mode (currently ${theme} mode)`}>
          {isDarkModeChecked ? <PiMoonBold className="h-3.5 w-3.5" /> : <PiSunBold className="h-3.5 w-3.5" />}
        </Button>
      </div>
    </header>
  );
}
