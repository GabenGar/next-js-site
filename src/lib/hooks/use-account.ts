import useSWR from "swr";
import { getAccount } from "#lib/api/public";

export function useAccount() {
  const { data: account, error } = useSWR("/account", getAccount, {
    shouldRetryOnError: false
  });

  return {
    account,
    isLoading: !error && !account,
    isError: Boolean(error),
    error: error
  };
}
