import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Password } from "@/components/ui/password";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { useMedia } from "@/hooks/use-media";
import { Text } from "@/components/ui/text";
import { Form } from "@/components/ui/form";
// import { routes } from "@/config/routes";
import { SignUpSchema, signUpSchema } from "@/utils/validators/signup.schema";
import { Link } from "react-router-dom";
import { routes } from "@/utils/config/routes";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { clearError, signUp } from "@/redux/auth/auth-actions";
import { useAppSelector } from "@/hooks/use-app-selector";

const initialValues = {
  email: "",
  password: "",
  isAgreed: false
};

export default function SignUpForm() {
  const isMedium = useMedia("(max-width: 1200px)", false);
  const [reset, setReset] = useState({});

  const dispatch = useAppDispatch();
  const { isFetching, error, stage } = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    dispatch(signUp(data));
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
          <Text className="font-semibold">Sign Up Failed!</Text>
          <Text className="font-medium">{error?.message}</Text>
        </Alert>
      )}

      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            {/* // <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5"> */}
            <div className="grid grid-cols-6">
              <Input
                type="text"
                size="lg"
                label="First Name"
                placeholder="Enter your first name"
                className="[&>label>span]:font-medium col-span-3 mr-2"
                color="info"
                inputClassName="text-sm"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <Input
                type="text"
                size="lg"
                label="Last Name"
                placeholder="Enter your last name"
                className="[&>label>span]:font-medium col-span-3"
                color="info"
                inputClassName="text-sm"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <Input
              type="email"
              size="lg"
              label="Email"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register("password")}
              error={errors.password?.message}
            />

            <Password
              label="Confirm Password"
              placeholder="Confirm your password"
              size="lg"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            <div className="col-span-2 flex items-start pb-1 text-gray-700">
              <Switch
                variant="flat"
                {...register("isAgreed")}
                className="[&>label>span.transition]:shrink-0 [&>label>span]:font-medium"
                label={
                  <Text className="ps-1 text-gray-500">
                    By signing up you have agreed to our{" "}
                    <Link to="/" className="font-semibold text-gray-700 transition-colors hover:text-primary">
                      Terms
                    </Link>{" "}
                    &{" "}
                    <Link to="/" className="font-semibold text-gray-700 transition-colors hover:text-primary">
                      Privacy Policy
                    </Link>
                  </Text>
                }
              />
            </div>
            <Button isLoading={isFetching} className="w-full" type="submit" size={isMedium ? "lg" : "xl"}>
              Create Account
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t want to reset?{" "}
        <Link to={routes.signIn} className="font-semibold text-gray-700 transition-colors hover:text-gray-1000">
          Sign In
        </Link>
      </Text>
    </>
  );
}
