import { apiV1Fetch } from "./fetch";

import type { APIResponse } from "#types/api";
import type { IAccountInit, IAccountClient } from "#types/entities";

export async function registerAccount(accCreds: IAccountInit) {
  try {
    const response = await apiV1Fetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ data: accCreds }),
    });
    const result: APIResponse<{ success: boolean }> = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function loginAccount(accCreds: IAccountInit) {
  try {
    const response = await apiV1Fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ data: accCreds }),
    });
    const result: APIResponse<{ account: IAccountClient }> =
      await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getAccount(
  key: string = "/account"
): Promise<APIResponse<IAccountClient> | undefined> {
  try {
    const response = await apiV1Fetch(key, {
      method: "POST",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
