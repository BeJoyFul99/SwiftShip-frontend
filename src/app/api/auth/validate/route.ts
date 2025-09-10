import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("jwt_token")?.value;
  if (token) {
    const backendRes = await fetch(
      `${process.env.BACKEND_URL}/api/auth/validate-jwt`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!backendRes.ok) {
      console.log("backendres not ok wtf");
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const data = await backendRes.json();
    console.log(backendRes.status, data);
    return NextResponse.json(data);
  } else {
    console.log("401 error wtf");

    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
