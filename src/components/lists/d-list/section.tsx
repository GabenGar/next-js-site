import { blockComponent } from "#components/meta";
import { DTerm } from "./term";
import { DDetails } from "./details";
import styles from "./_index.module.scss";

import type { ReactNode } from "react";
import type { BlockProps } from "#types/props";

export interface IDSectionProps extends BlockProps<"div"> {
  dKey?: ReactNode;
  dValue?: ReactNode;
}

/**
 * A grouping component for description terms and details.
 */
export const DSection = blockComponent<IDSectionProps>(
  styles.section,
  ({ dKey, dValue, children, ...blockProps }) => {
    return (
      <div {...blockProps}>
        {children ? (
          children
        ) : (
          <>
            <DTerm>{dKey}</DTerm>
            <DDetails>{dValue}</DDetails>
          </>
        )}
      </div>
    );
  }
);
