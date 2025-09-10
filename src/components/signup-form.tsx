"use client";
import { logoutSubmit, signupSubmit } from "@/app/actions/auth-actions";
import commonCountryCodes, { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { AlertCircleIcon } from "lucide-react";
import Form from "next/form";
import React, { useActionState, useEffect, useRef } from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { Spinner } from "./ui/shadcn-io/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SignupActionResponse } from "@/types/authForm";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const initialState: SignupActionResponse = {
  success: false,
  message: "",
};

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, isPending] = useActionState(signupSubmit, initialState);
  if (state?.debugMsg) {
    console.log("Debug Message:", state);
  }
  useEffect(() => {
    if (state?.success && state?.redirectPath) {
      toast.info("Your Account Has Been Created", {
        description: "Redirecting to login page...",
        duration: 4000,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      redirect(state?.redirectPath);
    }
  }, [state]);

  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-6 h-full w-full md:p-10 ",
        className
      )}
      {...props}
    >
      <Card className="bg-transparent border-0  shadow-none  ">
        <CardHeader className="text-center mt-auto ">
          <CardTitle className="text-3xl md:text-4xl text-foreground">
            Welcome To {process.env.NEXT_PUBLIC_APP_NAME}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-auto">
          <Form action={action}>
            <div className="grid gap-6 text-foreground ">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label className="text-foreground" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    defaultValue={state?.input?.email || ""}
                    aria-invalid={
                      state?.success == false &&
                      "EMAIL_ALREADY_EXISTS" == state.code
                    }
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label className="text-foreground" htmlFor="username">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={state?.input?.username || ""}
                    aria-invalid={
                      state?.success == false &&
                      "USERNAME_ALREADY_EXISTS" == state.code
                    }
                    placeholder="Your username"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label className="text-foreground" htmlFor="email">
                    Password
                  </Label>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <div className="flex justify-between items-center gap-5">
                  <div className="grid gap-3 flex-1/2 ">
                    <Label className="text-foreground" htmlFor="firstName">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      required
                      defaultValue={state?.input?.firstName || ""}
                    ></Input>
                  </div>
                  <div className="grid gap-3 flex-1/2">
                    <Label className="text-foreground" htmlFor="lastName">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      defaultValue={state?.input?.lastName || ""}
                      required
                    ></Input>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-5">
                  <div className="grid gap-3 flex-0">
                    <Label
                      className="text-foreground w-max min-w-max"
                      htmlFor="countryCode"
                    >
                      Country Code
                    </Label>
                    <Select
                      required
                      defaultValue={state?.input?.countryCode || ""}
                      name="countryCode"
                    >
                      <SelectTrigger className=" min-w-25 w-max">
                        <SelectValue placeholder="+1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Countries</SelectLabel>
                          {commonCountryCodes.map((country) => (
                            <SelectItem
                              key={country.iso}
                              value={`${country.code}_${country.iso}`}
                            >
                              ({country.code}) {country.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3 flex-1">
                    <Label className="text-foreground" htmlFor="phone">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="1234567890"
                      pattern="[0-9]*"
                      defaultValue={state?.input?.phone || ""}
                      inputMode="numeric"
                      required
                    ></Input>
                  </div>
                </div>
                {!state?.success && state?.message && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>
                      {state?.message || "Please try again later."}
                    </AlertTitle>
                    <AlertDescription>
                      {state?.errors && (
                        <ul className="list-inside list-disc text-sm">
                          {state.errors.map((err) => (
                            <li key={err}>{err}</li>
                          ))}
                        </ul>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  variant={"secondary"}
                  size={"lg"}
                  className="w-full "
                  disabled={isPending}
                  aria-label="Login to your account"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      Signing Up... <Spinner></Spinner>
                    </span>
                  ) : (
                    "SIgn Up"
                  )}
                </Button>
              </div>
              {/* other login providers */}
              <div className="text-center text-sm">
                Have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-accent text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="flex  gap-4">
                <Button
                  onClick={() => console.log("Google login clicked")}
                  size={"lg"}
                  type="button"
                  aria-label="Login with Apple"
                  variant="outline"
                  className="flex-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Apple
                </Button>
                <Button
                  type="button"
                  aria-label="Login with Google"
                  onClick={() => console.log("Google login clicked")}
                  size={"lg"}
                  variant="outline"
                  className="flex-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
export default SignUpForm;
