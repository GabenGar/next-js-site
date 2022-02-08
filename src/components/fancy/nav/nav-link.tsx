import { blockComponent } from "#components/meta";
import { Link } from "#components/links";
import styles from "./_index.module.scss";

import type { ILinkProps } from "#components/links";

interface Props extends ILinkProps {}

export const FancyNav = blockComponent<Props>(
  styles.block,
  ({ type, children, ...blockProps }) => {
    return (
      <Link type={type} {...blockProps}>
        {children}
      </Link>
    );
  }
);
