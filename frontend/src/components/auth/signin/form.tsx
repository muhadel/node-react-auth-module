import { SubmitHandler } from "react-hook-form";
import { Password } from "@/components/ui/password";
import { Checkbox } from "@/components/ui/checkbox";
import { useMedia } from "@/hooks/use-media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { Alert } from "@/components/ui/alert";
import { routes } from "@/utils/config/routes";
import { loginSchema, SignInSchema } from "@/utils/validators/signin.schema";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { clearError, signIn } from "@/redux/auth/auth-actions";
import { useEffect, useState } from "react";

const initialValues: SignInSchema = {
  email: "",
  password: "",
  rememberMe: true
};

export default function SignInForm() {
  const isMedium = useMedia("(max-width: 1200px)", false);
  const [_, setReset] = useState({});

  const dispatch = useAppDispatch();
  const { isFetching, error, stage } = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    dispatch(signIn(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
      setReset({ ...initialValues, isAgreed: false });
    };
  }, []);

  return (
    <>
      {stage === "rejected" && (
        <Alert bar={true} size="lg" color="danger" className="mb-4" variant="flat">
          <Text className="font-semibold">Sign In Failed!</Text>
          <Text className="font-medium">{error?.message}</Text>
        </Alert>
      )}

      <Form<SignInSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? "lg" : "xl"}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register("email")}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? "lg" : "xl"}
              className="[&>label>span]:font-medium"
              {...register("password")}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-1">
              <Checkbox {...register("rememberMe")} label="Remember Me" className="[&>label>span]:font-medium" />
              <Link to={"/"} className="h-auto p-0 text-sm font-semibold text-gray-700 underline transition-colors hover:text-primary hover:no-underline">
                Forgot Password?
              </Link>
            </div>

            <Button disabled={isFetching} isLoading={isFetching} className="w-full" type="submit" size={isMedium ? "lg" : "xl"}>
              Sign In
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{" "}
        <Link to={routes.signUp} className="font-semibold text-gray-700 transition-colors hover:text-primary">
          Sign Up
        </Link>
      </Text>
    </>
  );
}
