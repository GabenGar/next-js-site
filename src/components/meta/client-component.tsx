import { IS_BROWSER } from "#environment/constants";
import { useEffect, useState } from "react";

import type { ReactElement } from "react";

export interface IClientComponentProps {
  children: ReactElement;
}

/**
 * Renders the children on client-only.
 */
export function ClientComponent({ children }: IClientComponentProps) {
  const [isEnabled, enableComponent] = useState(false);

  useEffect(() => {
    IS_BROWSER && enableComponent(true);
  }, []);

  return <>{isEnabled && children}</>;
}
