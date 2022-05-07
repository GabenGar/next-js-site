import { useState, useEffect } from "react";
import { IS_BROWSER } from "#environment/constants";

export function useClient() {
  const [isClient, initClient] = useState(IS_BROWSER);

  // `useEffect()` hook runs only on client
  useEffect(() => {
    if (isClient) {
      return;
    }

    initClient(true);
  }, []);

  return { isClient };
}
