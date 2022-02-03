import { blockComponent } from "#components/meta";
import { Input } from "./base";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"input"> {}

export const TextInput = blockComponent<Props>(
  styles.text,
  ({ ...blockProps }) => {
    return <Input {...blockProps} type="text" />;
  }
);
