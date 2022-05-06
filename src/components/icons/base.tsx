import { SVGSprite } from "#assets";
import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { StaticImageData } from "next/image"
import type { BlockProps } from "#types/props";

export interface ISVGIconProps extends BlockProps<"span"> {
  /**
   * Icon ID in the svg sprite sheet.
   */
  iconID: string;
}

export const SVGIcon = blockComponent<ISVGIconProps>(
  styles.block,
  ({ iconID, children, ...blockProps }) => {
    const iconPath = `${(SVGSprite as StaticImageData).src}#${iconID}`;

    return (
      <span {...blockProps}>
        <svg className={styles.svg}>
          <use className={styles.use} href={iconPath} />
        </svg>
      </span>
    );
  }
);
