import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ROLE = ["USER", "ADMIN", "PROVIDER"];

// Exact public routes
const PUBLIC_ROUTES = ["/login", "/register", "/", "/verify-email"];

// Prefix public routes
const PUBLIC_PREFIXES = ["/meals", "/providers"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  if (
    PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return NextResponse.next();
  }

  // Fetch user session directly in middleware to avoid edge runtime issues with next/headers
  let user = null;
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

    // We can fetch from get-session to verify authentication
    const res = await fetch(`${backendUrl}/api/auth/get-session`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (res.ok) {
      const sessionData = await res.json();
      user = sessionData?.user;
    }
  } catch (error) {
    console.error("Middleware session fetch error:", error);
  }

  if (!user) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, origin),
    );
  }

  if (!ALLOWED_ROLE.includes(user.role)) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, origin),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
