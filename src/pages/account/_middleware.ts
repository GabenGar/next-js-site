import { NextResponse } from "next/server";
import { FOUND } from "#environment/constants/http";
import { SESSION_COOKIE } from "#environment/derived";

import type { NextFetchEvent, NextRequest } from "next/server";

export default function authMiddleware(req: NextRequest, ev: NextFetchEvent) {
  // check for presence of the session cookie
  // redirect to the auth page if the site isn't public
  // eventually it's going to perform a full auth check
  const cookies = req.cookies[SESSION_COOKIE];

  if (!cookies) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url, FOUND);
  }

  return NextResponse.next();
}
