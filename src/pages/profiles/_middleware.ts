import { NextResponse } from "next/server";
import { FOUND } from "#environment/constants/http";

import type { NextFetchEvent, NextRequest } from "next/server";

export default function profilesMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  const url = req.nextUrl.clone();
  const [locale, _, page] = url.pathname.split("/");

  // redirecting to first page if no page parameter provided
  // @TODO redirect to last page
  if (!page) {
    url.pathname = "/profiles/1";
    return NextResponse.redirect(url, FOUND);
  }

  return NextResponse.next();
}
