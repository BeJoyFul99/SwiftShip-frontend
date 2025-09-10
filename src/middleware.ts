import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwt_token = request.cookies.get("jwt_token")?.value || null;
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (jwt_token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!jwt_token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
