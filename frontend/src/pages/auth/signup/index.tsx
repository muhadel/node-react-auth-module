import AuthWrapper from "@/components/auth/wrapper";
import SignUpForm from "@/components/auth/signup/form";
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
      <AuthWrapper title="Join us today! Get special benefits and stay up-to-date." isSocialLoginActive={true}>
        <SignUpForm />
      </AuthWrapper>
    </LayoutWrapper>
  );
}
