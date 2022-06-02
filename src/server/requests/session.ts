import { getIronSession } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { SECRET_KEY } from "#environment/vars";
import { IS_DEVELOPMENT, SESSION_COOKIE } from "#environment/derived";
import { SessionError, AdminError } from "#lib/errors";
import { getAccountDetails } from "#lib/account";

import type { IncomingMessage, ServerResponse } from "http";
import type { IronSessionOptions } from "iron-session";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiHandler,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { APIResponse } from "#types/api";
import type { IAuthInfo } from "#lib/account";

export const sessionOptions: IronSessionOptions = {
  password: SECRET_KEY,
  cookieName: SESSION_COOKIE,
  cookieOptions: {
    secure: !IS_DEVELOPMENT,
  },
};

export async function getSession(req: IncomingMessage, res: ServerResponse) {
  const session = await getIronSession(req, res, sessionOptions);
  return session;
}

/**
 * @returns Account info.
 * @throws {@link SessionError}
 */
export async function getAccountSession(
  ...args: Parameters<typeof getSession>
): Promise<IAuthInfo> {
  const session = await getSession(...args);
  const { account_id } = session;

  if (!account_id) {
    throw new SessionError('This session doesn\'t have "account_id" property.');
  }

  const account = await getAccountDetails(account_id);

  // should be a logging scenario
  // since non-existent ID is a server error
  // or a hacking attempt
  if (!account) {
    session.destroy();
    throw new SessionError(`Account with ID "${account_id}" doesn't exist.`);
  }

  return {
    account,
  };
}

/**
 * @throws {@link AdminError}
 */
export async function getAdminSession(
  ...args: Parameters<typeof getAccountSession>
): Promise<IAuthInfo> {
  const authInfo = await getAccountSession(...args);
  const { account } = authInfo;

  if (account.role !== "administrator") {
    throw new AdminError(
      `Account of ID "${account.id}" is not an administrator.`
    );
  }

  return authInfo;
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
