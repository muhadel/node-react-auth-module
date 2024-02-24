import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import cn from "@/utils/class-names";
import { siteConfig } from "@/utils/config/site.config";
import { Title } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import OrSeparation from "@/components/ui/or-separation";

export default function AuthWrapper({
  children,
  title,
  isSocialLoginActive = false,
  isSignIn = false,
  className = ""
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  className?: string;
}) {
  function handleSignIn() {
    toast.error(
      <Text>
        This is only for demo purpose, click on the{" "}
        <Text as="b" className="font-semibold text-gray-900">
          {isSignIn ? "Sign In" : "Create Account"}
        </Text>{" "}
        button to {isSignIn ? "login" : "create a new account"}.
      </Text>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <div className="flex w-full flex-col justify-center px-5">
        <div className={cn("mx-auto w-full max-w-md py-12 md:max-w-lg lg:max-w-xl 2xl:pb-8 2xl:pt-2", className)}>
          <div className="flex flex-col items-center">
            <Link to={"/"} className="mb-7 inline-block max-w-[64px] lg:mb-9">
              <img src={siteConfig.icon} alt={siteConfig.title} />
            </Link>
            <Title as="h2" className="mb-7 text-center text-[28px] font-bold leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl">
              {title}
            </Title>
          </div>
          {isSocialLoginActive && (
            <>
              <div className="flex flex-col gap-4 pb-6 md:flex-row md:gap-6 xl:pb-7">
                <Button rounded="pill" variant="outline" className="h-11 w-full" onClick={() => handleSignIn()}>
                  <FcGoogle className="me-2 h-4 w-4 shrink-0" />
                  <span className="truncate">Sign in with Google</span>
                </Button>

                <Button rounded="pill" variant="outline" className="h-11 w-full " onClick={() => handleSignIn()}>
                  <BsFacebook className="me-2 h-4 w-4 shrink-0 md:h-5 md:w-5" />
                  <span className="truncate">Sign in with Facebook</span>
                </Button>
              </div>
              <OrSeparation title={`Or, Sign ${isSignIn ? "in" : "up"} with your email`} isCenter className="mb-5 2xl:mb-7" />
            </>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
