"use server";

import { LoginActionResponse, SignupActionResponse } from "@/types/authForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginSubmit(
  prevState: LoginActionResponse,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");
  // Implement your login logic here

  let response: LoginActionResponse = {
    success: false,
    message: "",
    input: prevState?.input || { email: email as string },
  };

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).catch((error) => {
    response = {
      success: false,
      message: "Login failed. Please try again.",
      debugMsg: `Status code: ${error.message}`,
      input: { email: email as string },
    };
  });

  const data = await res?.json();
  if (data) {
    const errors = [data?.message];

    if (data.code === "LOGIN_SUCCESS" && data.jwt_token) {
      (await cookies()).set("jwt_token", data.jwt_token, {
        httpOnly: true, // Recommended for security (if client-side doesn't need to read it)
        secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
        maxAge: 60 * 60 * 24 * 1, // 1 day
        path: "/", // Make the cookie available to all paths
      });

      response = {
        success: true,
        message: data.message,
        data: { token: data.jwt_token, user: data.user },
        code: data?.code,
        debugMsg: data.debugMsg || `Status code: ${res?.status}`,
        input: { email: email as string },
        redirectPath: "/dashboard",
      };
    } else {
      response = {
        success: false,
        message: data.message || "Login failed. Please try again.",
        code: data?.code,
        debugMsg: data.debugMsg || `Status code: ${res?.status}`,
        input: { email: email as string },
        errors: errors, // Example error messages
      };
    }
  }
  // This console.log should now show the full JSON object
  console.log("JSON parsed successfully:", data);

  return response;
}

export async function signupSubmit(
  prevState: SignupActionResponse,
  formData: FormData
) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const countryCode = formData.get("countryCode");
  const username = formData.get("username");

  let response: SignupActionResponse = {
    message: "",
    input: {
      email: email as string,
      firstName: firstName as string,
      lastName: lastName as string,
      username: username as string,
      countryCode: countryCode as string,
      phone: phone as string,
    },
    errors: [] as string[],
    redirectPath: undefined,
    success: false,
  };

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      password,
      countryCode,
      username,
    }),
  }).catch((error) => {
    response = {
      ...response,
      success: false,
      message: "Signup failed. Please try again.",
      debugMsg: `Status code: ${error.message}`,
    };
  });

  if (res) {
    const data = await res?.json();

    if (data?.code === "REGISTRATION_SUCCESS") {
      response = {
        ...response,
        success: true,
        message: data.code || "Signup successful.",
        debugMsg: data.debugMsg || `Status code: ${res?.status}`,
        redirectPath: "/login",
      };
    } else if (data?.code == "EMAIL_ALREADY_EXISTS") {
      response = {
        ...response,
        success: false,
        message: data.message,
        code: data?.code,
        debugMsg: data.message || `Status code: ${res?.status}`,
        errors: ["Email already exists. Please use a different email."],
      };
    } else if (data?.code == "USERNAME_ALREADY_EXISTS") {
      response = {
        ...response,
        success: false,
        message: data.message,
        code: data?.code,
        debugMsg: data.message,
        errors: ["Username already exists. Please use a different username."],
      };
    } else {
      response = {
        ...response,
        success: false,
        message: "Signup failed. Please try again.",
        code: data?.code,
        debugMsg: `Reason:${data?.message}`,
      };
    }
  }

  return response;
}
export async function logoutSubmit() {
  (await cookies()).delete("jwt_token");
  
  redirect("/login");
}
