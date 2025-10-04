import { apiFetcher } from "@/lib/apis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("jwt_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        isValidated: false,
        message: "No token",
      },
      { status: 400 }
    );
  }

  try {
    const backendRes = await apiFetcher("/api/auth/validate-jwt", {
      method: "GET",
    });
    const data = await backendRes.json();
    console.log(data);

    if (backendRes.ok && data) {
      console.log(data);
      return NextResponse.json({ isValidated: true, user: data.data.user }); // Assuming backend returns user data
    } else {
      console.error("Validation failed:", data);
      return NextResponse.json(
        { isValidated: false, message: data.message || "Invalid token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error validating token:", error);
    return NextResponse.json(
      { isValidated: false, message: "Validation error" },
      { status: 400 }
    );
  }
}
