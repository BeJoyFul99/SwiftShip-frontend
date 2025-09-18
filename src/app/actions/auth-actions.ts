"use server";

import { apiFetcher } from "@/lib/apis";
import { LoginActionResponse, SignupActionResponse } from "@/types/authForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(
  prevState: LoginActionResponse,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");
  let response: LoginActionResponse = {
    success: false,
    message: "",
    input: prevState?.input || { email: email as string },
  };
  try {
    const res = await apiFetcher("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res?.json();
    console.log("Fetch response:", res); // Log the fetch response object
    if (res.ok && data) {
      const errors = [data?.message];
      if (data.code === "LOGIN_SUCCESS") {
        const cookieHeader = res.headers.get("set-cookie");
        if (!cookieHeader)
          throw new Error("No set-cookie header found in response");

        const cookie = cookieHeader.split(";"); // Extract the cookie value
        const tokenParts = cookie[0].split("=");
        if (tokenParts.length !== 2) {
          throw new Error("Invalid cookie format");
        }
        (await cookies()).set(tokenParts[0], tokenParts[1], {
          httpOnly: true, // Recommended for security (if client-side doesn't need to read it)
          secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
          maxAge: 60 * 60 * 24 * 1, // 1 day
          path: "/", // Make the cookie available to all paths
        });
        response = {
          success: true,
          message: data.message,
          data: data?.user,
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
  } catch (error) {
    response = {
      success: false,
      message: "Login failed. Please try again.",
      debugMsg: `Status code: ${error.message}`,
      input: { email: email as string },
    };
  }

  return response;
}

export async function signupAction(
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
export async function logoutAction() {
  // Call backend to invalidate token and clear cookie
  try {
    // Use apiFetcher which will send the existing jwt_token cookie to the backend
    const res = await apiFetcher("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      console.log("Backend logout response:", data);
    }
  } catch (error) {
    console.error("Error calling backend logout:", error);
  }
  (await cookies()).delete("jwt_token"); // Also delete the cookie on the Next.js server side
  redirect("/login");
}
