import { useEffect } from "react";
import useSWRMutation from 'swr/mutation'
import { getAccount } from "#lib/api/public";
import { getLocalStoreItem } from "#store/local";
import { IAccountClient } from "#types/entities";

export function useAccount() {
  const { data: account, error, trigger } = useSWRMutation("/account", getAccount);

  useEffect(() => {
    const localAcc = getLocalStoreItem<IAccountClient>("account")
    if (!localAcc) {

    }
  }, []);

  return {
    account,
    isAdmin: account?.role === "administrator",
    isLoading: !error && !account,
    isError: Boolean(error),
    error: error,
  };
}
