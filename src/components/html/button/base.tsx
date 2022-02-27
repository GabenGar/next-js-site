import { blockComponent } from "#components/meta";
import { SVGIcon } from "#components/icons";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface HTMLButtonProps extends BlockProps<"button"> {
  iconID?: string;
}

export const HTMLButton = blockComponent<HTMLButtonProps>(
  styles.block,
  ({ iconID, children, ...blockProps }) => {
    return (
      <button {...blockProps}>
        {iconID && <SVGIcon className={styles.icon} iconID={iconID} />}
        <span>{children}</span>
      </button>
    );
  }
);
