import { forwardRef } from "react";
import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { LegacyRef } from "react";
import type { BlockProps } from "#types/props";

export interface IHTMLInputProps extends BlockProps<"input"> {}

export const HTMLInput = forwardRef<HTMLInputElement, IHTMLInputProps>(
  blockComponent(styles.block, Component)
);

function Component(
  { ...blockProps }: IHTMLInputProps,
  ref?: LegacyRef<HTMLInputElement>
) {
  return <input {...blockProps} ref={ref} />;
}
