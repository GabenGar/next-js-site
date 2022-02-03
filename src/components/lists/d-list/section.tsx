import { blockComponent } from "#components/meta";
import { DescriptionTerm } from "./term";
import { DescriptionDetails } from "./details";
import styles from "./_index.module.scss";

import type { ReactNode } from "react";
import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"div"> {
  dKey?: ReactNode;
  dValue?: ReactNode;
}

export const DescriptionSection = blockComponent<Props>(
  styles.section,
  ({ dKey, dValue, children, className, ...blockProps }) => {
    return (
      <div {...blockProps}>
        {children ? (
          children
        ) : (
          <>
            <DescriptionTerm>{dKey}</DescriptionTerm>
            <DescriptionDetails>{dValue}</DescriptionDetails>
          </>
        )}
      </div>
    );
  }
);
