"use server";
import { CustomRequestInit } from "@/types/api";
import { cookies } from "next/headers";

export async function apiFetcher(
  endpoint: string,
  options?: CustomRequestInit
): Promise<Response> {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const token = (await cookies()).get("jwt_token");
  let cookieHeader = "";
  if (token) {
    cookieHeader = `${token.name}=${token.value}`;
  }

  const config: CustomRequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options?.headers || {}),
    },
    credentials: "include",
  };
  if (cookieHeader)
    config.headers = {
      ...config.headers,
      Cookie: cookieHeader,
    };

  const url = `${process.env.BACKEND_URL}${endpoint}`;
  // --- START DEBUGGING LOGS ---
  /*  console.log("--- Outgoing Request Debug ---");
  console.log("Request URL:", url);
  console.log("Request Method:", config.method || "GET"); // Default to GET if not specified
  console.log("Request Headers:", config.headers); */

  // If you want to see the body (for POST/PUT requests)
  /*  if (config.body) {
    // console.log("Request Body:", config.body);
    // If body is a string (like JSON.stringify), you can log it directly.
    // If it's a FormData object, you might need to iterate it.
  } else {
    console.log("No Request Body.");
  } */
  /* console.log("Request Credentials:", config.credentials);
  console.log("--- End Outgoing Request Debug ---") */ // --- END DEBUGGING LOGS ---
  const response = await fetch(url, config);

  if (!response.ok) {
    // You could parse the error response and throw a more specific error
    console.log(response);
    let errorData: any = null;
    try {
      errorData = await response.json();
    } catch (error) {}

    throw new Error(errorData?.message || "Something went wrong");
  }

  return response;
}
