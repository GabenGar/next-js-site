import { NextResponse } from "next/server";
import { FOUND } from "#environment/constants/http";
import { IS_PUBLIC, SESSION_COOKIE } from "#environment/derived";

import type { NextFetchEvent, NextRequest } from "next/server";

export default function pageMiddleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();

  // skip API routes because they are going to be handled by a separate middleware
  if (url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // also skip auth pages
  if (url.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // check for presence of the session cookie
  // redirect to the auth page if the site isn't public
  // eventually it's going to perform a full auth check
  if (!IS_PUBLIC) {
    const cookies = req.cookies[SESSION_COOKIE];

    if (!cookies) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url, FOUND);
    }
  }

  return NextResponse.next();
}
