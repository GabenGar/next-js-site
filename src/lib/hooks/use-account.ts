import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { getAccount } from "#lib/api/public";
import { AuthError } from "#lib/errors";
import { getLocalStoreItem } from "#store/local";

export function useAccount() {
  const {
    data: account,
    error,
    trigger,
  } = useSWRMutation("/account", getAccount);

  useEffect(() => {
    async () => {
      const isRegistered = getLocalStoreItem<boolean>("is_registered");

      if (!isRegistered) {
        return;
      }

      const accResult = await trigger();

      if (!accResult) {
        throw new AuthError("Failed to authenticate");
      }
    };
  }, []);

  return {
    account,
    isAdmin: account?.role === "administrator",
    isLoading: !error && !account,
    isError: Boolean(error),
    error: error,
  };
}
