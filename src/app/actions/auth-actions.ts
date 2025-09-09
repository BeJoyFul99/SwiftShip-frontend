"use server";

import { LoginActionResponse } from "@/types/loginForm";

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
  console.log("Form Data:", formData);
  console.log("Previous State:", prevState);

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    const errors = [data.message];

    if (data.success) {
      response = {
        success: true,
        message: "Login successful!",
        input: {},
      };
    } else {
      response = {
        success: false,
        message: data.code || "Login failed. Please try again.",
        debugMsg: data.debugMsg || `Status code: ${res.status}`,
        input: { email: email as string },
        errors: errors, // Example error messages
      };
    }
    // This console.log should now show the full JSON object
    console.log("JSON parsed successfully:", data);
  } catch (error) {
    response = {
      success: false,
      message: "Login failed. Please try again.",
      debugMsg: `Status code: ${error.message}`,
      input: prevState?.input,
    };
  }

  // if (!res.ok) {
  //   response = {
  //     success: false,
  //     message: "Login failed. Please try again.",
  //     debugMsg: `Status code: ${res.status}`,
  //     input: prevState?.input,
  //   };
  // }
  return response;
}
