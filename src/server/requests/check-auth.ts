import {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} from "#environment/constants/http";
import { getAccountDetails } from "#lib/account";

import type { GetServerSidePropsContext, NextApiRequest } from "next";
import type { APIResponseFailure } from "#types/api";
import type { IAccount } from "#types/entities";
import type { OperationResult } from "#types/util";

export type AuthResult = AuthSuccess | AuthFailure;
export interface AuthSuccess extends OperationResult<true> {
  account: IAccount;
}

export interface AuthFailure extends OperationResult<false> {
  response: {
    status: number;
    json: APIResponseFailure;
  };
}

export async function checkAuth(req: NextApiRequest): Promise<AuthResult> {
  const { account_id } = req.session;

  if (!account_id) {
    return {
      is_successful: false,
      response: {
        status: UNAUTHORIZED,
        json: { is_successful: false, errors: ["Not Authorized."] },
      },
    };
  }

  const account = await getAccountDetails(account_id);

  if (!account) {
    const reqDetails = JSON.stringify(req, undefined, 2);
    console.error(
      `Account with ID "${account_id}" doesn't exist.\n`,
      `Request details: "${reqDetails}".`
    );
    req.session.destroy();

    return {
      is_successful: false,
      response: {
        status: INTERNAL_SERVER_ERROR,
        json: {
          is_successful: false,
          errors: ["Unknown Error."],
        },
      },
    };
  }

  return {
    is_successful: true,
    account: account,
  };
}

export async function checkAuthSSR<
  PageContext extends GetServerSidePropsContext
>({ req }: PageContext) {
  const { account_id } = req.session;

  if (!account_id) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
