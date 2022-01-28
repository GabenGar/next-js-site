import { blockComponent } from "#components/meta";
import { Input } from "./base";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"input"> {}

export const NumberInput = blockComponent<Props>(
  styles.number,
  ({ ...blockProps }) => {
    return <Input {...blockProps} type="number" />;
  }
);
