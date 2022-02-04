import { SVGSprite } from "#assets";
import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface SVGIconProps extends BlockProps<"span"> {
  iconID: string;
}

export const SVGIcon = blockComponent<SVGIconProps>(
  styles.block,
  ({ iconID, children, ...blockProps }) => {
    const iconPath = `${SVGSprite.src}#${iconID}`;

    return (
      <span {...blockProps}>
        <svg className={styles.svg}>
          <use className={styles.use} href={iconPath} />
        </svg>
      </span>
    );
  }
);
