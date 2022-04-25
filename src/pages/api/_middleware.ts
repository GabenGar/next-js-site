import { NextResponse } from "next/server";
import { UNAUTHORIZED } from "#environment/constants/http";
import { IS_PUBLIC, SESSION_COOKIE } from "#environment/derived";

import type { NextFetchEvent, NextRequest } from "next/server";

export default function apiMiddleware(req: NextRequest, ev: NextFetchEvent) {
  // check for presence of the session cookie
  // redirect to the auth page if the site isn't public
  // eventually it's going to perform a full auth check
  if (!IS_PUBLIC) {
    const cookies = req.cookies[SESSION_COOKIE];

    if (!cookies) {
      const res = new NextResponse(
        JSON.stringify({
          is_successful: false,
          errors: ["Not Authorized"],
        }),
        {
          status: UNAUTHORIZED,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    }
  }

  return NextResponse.next();
}
