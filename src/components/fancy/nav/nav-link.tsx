import { blockComponent } from "#components";
import { FancyLink } from "#components/links";
import styles from "./_index.module.scss";

import type { LinkProps } from "#components/links";

interface Props extends LinkProps {}

export const FancyNav = blockComponent<Props>(
  styles.block,
  ({ type, children, ...blockProps }) => {
    return (
      <FancyLink type={type} {...blockProps}>
        {children}
      </FancyLink>
    );
  }
);
