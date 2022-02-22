import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { SITE_NAME, SECRET_KEY } from "#environment/vars";
import { IS_DEVELOPMENT } from "#environment/derived";
import { getAccountDetails } from "#lib/account";

import type { IronSessionOptions } from "iron-session";
import type {
  GetServerSideProps,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import { BasePageProps } from "#types/pages";

export const sessionOptions: IronSessionOptions = {
  password: SECRET_KEY,
  cookieName: `${SITE_NAME}_cookie_cutter`,
  cookieOptions: {
    secure: !IS_DEVELOPMENT,
  },
};

/**
 * The route which requires an account.
 * TODO: also pass account details to resulting callback.
 */
function protectedRoute<R>(handler: NextApiHandler<R>) {
  return async (req: NextApiRequest, res: NextApiResponse<BasePageProps>) => {
    const { account_id } = req.session;

    if (!account_id) {
      return res
        .status(401)
        .json({ success: false, errors: ["Not Authorized."] });
    }

    const account = await getAccountDetails(account_id);

    if (!account) {
      const reqDetails = JSON.stringify(req, undefined, 2);
      console.error(
        `Account with ID "${account_id}" doesn't exist.\n`,
        `Request details: "${reqDetails}".`
      );
      req.session.destroy();

      return res.status(500).json({
        success: false,
        errors: ["Unknown Error."],
      });
    }

    return withSessionRoute<R>(handler);
  };
}

export function withSessionRoute<R>(handler: NextApiHandler<R>) {
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
