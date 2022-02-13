import { blockComponent } from "#components/meta";
import { DescriptionTerm } from "./term";
import { DDetails } from "./details";
import styles from "./_index.module.scss";

import type { ReactNode } from "react";
import type { BlockProps } from "#types/props";

export interface DSectionProps extends BlockProps<"div"> {
  dKey?: ReactNode;
  dValue?: ReactNode;
}

export const DSection = blockComponent<DSectionProps>(
  styles.section,
  ({ dKey, dValue, children, ...blockProps }) => {
    return (
      <div {...blockProps}>
        {children ? (
          children
        ) : (
          <>
            <DescriptionTerm>{dKey}</DescriptionTerm>
            <DDetails>{dValue}</DDetails>
          </>
        )}
      </div>
    );
  }
);
