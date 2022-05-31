import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { SECRET_KEY } from "#environment/vars";
import { IS_DEVELOPMENT, SESSION_COOKIE } from "#environment/derived";

import type { IronSessionOptions } from "iron-session";
import type { GetServerSideProps, NextApiHandler } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { APIResponse } from "#types/api";

export const sessionOptions: IronSessionOptions = {
  password: SECRET_KEY,
  cookieName: SESSION_COOKIE,
  cookieOptions: {
    secure: !IS_DEVELOPMENT,
  },
};

export function withSessionRoute<Res>(
  handler: NextApiHandler<APIResponse<Res>>
) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSSR<
  P extends Record<string, unknown>,
  Q extends ParsedUrlQuery = ParsedUrlQuery
>(handler: GetServerSideProps<P, Q>) {
  // @ts-expect-error fix later
  return withIronSessionSsr(handler, sessionOptions);
}

// export function protectedPageSSR<P extends Record<string, unknown>>(
//   handler: SSRCallback<P>
// ) {}
