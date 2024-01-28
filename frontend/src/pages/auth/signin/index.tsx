import AuthWrapper from "@/components/auth/wrapper";
import SignInForm from "@/components/auth/signin/form";
import useAuth from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { routes } from "@/utils/config/routes";
import LayoutWrapper from "@/components/layout/wrapper";

export default function SignUpPage() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={routes.home} replace />;
  }
  return (
    <LayoutWrapper>
      <AuthWrapper
        title={
          <>
            Welcome Back! <br /> Sign in with your credentials.
          </>
        }
        isSignIn
        isSocialLoginActive={true}
      >
        <SignInForm />
      </AuthWrapper>
    </LayoutWrapper>
  );
}
