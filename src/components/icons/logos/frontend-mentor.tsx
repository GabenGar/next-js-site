import { blockComponent } from "#components/meta";
import { SVGIcon } from "#components/icons";
import styles from "./frontend-mentor.module.scss";

import type { SVGIconProps } from "#components/icons";

export interface FELogoProps extends Omit<SVGIconProps, "iconID"> {}

export const FELogo = blockComponent<FELogoProps>(
  styles.block,
  ({ ...blockProps }) => {
    return <SVGIcon {...blockProps} iconID="frontend-mentor-logo" />;
  }
);
