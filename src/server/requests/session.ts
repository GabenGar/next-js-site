import { getIronSession } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { SECRET_KEY } from "#environment/vars";
import { IS_DEVELOPMENT, SESSION_COOKIE } from "#environment/derived";

import type { IronSessionOptions } from "iron-session";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiHandler,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { APIResponse } from "#types/api";

export const sessionOptions: IronSessionOptions = {
  password: SECRET_KEY,
  cookieName: SESSION_COOKIE,
  cookieOptions: {
    secure: !IS_DEVELOPMENT,
  },
};

export async function getSSRSession<Params extends ParsedUrlQuery>(
  context: GetServerSidePropsContext<Params>
) {
  const { req, res } = context;
  const session = await getIronSession(req, res, sessionOptions);
  return session;
}

export function withSessionRoute<Res>(
  handler: NextApiHandler<APIResponse<Res>>
) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSSR<
  Props extends Record<string, unknown>,
  Q extends ParsedUrlQuery = ParsedUrlQuery
>(handler: GetServerSideProps<Props, Q>) {
  // @ts-expect-error fix later
  const sessionCallback = withIronSessionSsr<Props>(handler, sessionOptions);

  return sessionCallback;
}
