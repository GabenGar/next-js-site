import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { getAccount } from "#lib/api/public";
import { getLocalStoreItem } from "#store/local";

export function useAccount() {
  const [isRegistered, changeRegisteredStatus] = useState(false);
  const {
    data: account,
    error,
    isLoading,
  } = useSWRImmutable(isRegistered ? "/account" : null, getAccount, {
    shouldRetryOnError: false,
  });

  useEffect(() => {
    if (!getLocalStoreItem<boolean>("is_registered")) {
      return;
    }

    changeRegisteredStatus(true);
  }, []);

  return {
    account,
    isAdmin: account?.role === "administrator",
    isLoading,
    isError: Boolean(error),
    error: error,
  };
}
