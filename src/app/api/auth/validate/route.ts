import { apiFetcher } from "@/lib/apis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("jwt_token")?.value;
  if (token) {
    try {
      const backendRes = await apiFetcher("/api/auth/validate-jwt", {
        method: "GET",
      });
      if (!backendRes.ok) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
      }

      const data = await backendRes.json();

      return NextResponse.json(data);
    } catch (error) {
      console.error("Error validating token:", error);
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
  } else {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
