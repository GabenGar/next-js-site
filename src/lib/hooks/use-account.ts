import { useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAccount } from "#lib/api/public";
import { getLocalStoreItem } from "#store/local";
import { IAccountClient } from "#types/entities";

export function useAccount() {
  const { data: account, error } = useSWR("/account", getAccount);

  return {
    account,
    isAdmin: account?.role === "administrator",
    isLoading: !error && !account,
    isError: Boolean(error),
    error: error,
  };
}
