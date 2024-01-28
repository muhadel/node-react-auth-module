import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { PiArrowLineRight, PiUserCirclePlus } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import cn from "@/utils/class-names";
import { routes } from "@/utils/config/routes";
import { siteConfig } from "@/utils/config/site.config";
import useAuth from "@/hooks/use-auth";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { signOut } from "@/redux/auth/auth-actions";

function NavLink({
  href,
  children
}: React.PropsWithChildren<{
  href: string;
}>) {
  const pathname = useLocation().pathname;

  function isActive(href: string) {
    if (pathname === href) {
      return true;
    }
    return false;
  }

  return (
    <Link
      to={href}
      className={cn(
        "inline-flex items-center gap-x-1 rounded-3xl p-2 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 md:px-4 md:py-2.5 [&>svg]:w-4 [&>svg]:text-gray-500",
        isActive(href) ? "bg-gray-100 text-gray-900 [&>svg]:text-gray-900" : " "
      )}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const { isAuthenticated, user } = useAuth();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate(routes.home);
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
              <PiArrowLineRight className="h-4 w-4" />
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

            <Button rounded="pill" variant="flat" className="bg-[#F3F4F6]" onClick={handleSignOut}>
              <AiOutlineLogout className="h-4 w-4 mr-2" />
              <span>Log out</span>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
