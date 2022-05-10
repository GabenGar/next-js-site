import { NextResponse } from "next/server";
import { FOUND } from "#environment/constants/http";

import type { NextFetchEvent, NextRequest } from "next/server";

export default function profilesMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  const url = req.nextUrl.clone();
  const [locale, _, page] = url.pathname.split("/");
  const isValidPage = Boolean(page && Number.isSafeInteger(Number(page)));

  if (!isValidPage) {
    const pageParam = url.searchParams.get("page");
    const isValidPageParam = Boolean(
      pageParam && Number.isSafeInteger(Number(pageParam))
    );
    // redirecting to first page if no valid page provided
    // @TODO redirect to last page
    let redirectPage = 1;

    if (isValidPageParam) {
      url.searchParams.delete("page");
      redirectPage = Number(pageParam);
    }

    url.pathname = `/profiles/${redirectPage}`;
    return NextResponse.redirect(url, FOUND);
  }

  return NextResponse.next();
}
