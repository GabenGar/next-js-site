import { useState, useEffect } from "react";

export function useClient() {
  const [isClient, initClient] = useState(false);

  // `useEffect()` hook runs only on client
  useEffect(() => {
    initClient(true);
  }, []);

  return { isClient };
}
