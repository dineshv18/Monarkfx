import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface UserDetails {
  id: string;
  email: string;
  role: "ADMIN" | "STUDENT";
  name: string;
}

const ROUTES = {
  public: ["/", "/about", "/contact", "/courses", "/blog"],
  auth: ["/auth", "/login", "/register"],
  admin: ["/dashboard", "/admin"],
  user: ["/user-profile", "/my-courses", "/settings"],
} as const;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow "/" route to pass through
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Redirect all other routes to "/"
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json).*)",
  ],
};