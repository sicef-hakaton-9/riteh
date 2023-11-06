import createMiddleware from "next-intl/middleware";
import ReqHeaders from "./constants/enums/ReqHeaders";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  req.headers.set(ReqHeaders.PATHNAME, req.nextUrl.pathname);
  NextResponse.next();
  const handleI18nRouting = createMiddleware({
    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: "en",

    localePrefix: "always",
    // A list of all locales that are supported
    locales: ["en", "hr", "sr"]
  });
  const res = handleI18nRouting(req);

  return res;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
