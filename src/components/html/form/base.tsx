import { forwardRef } from "react";
import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { FormEvent, LegacyRef } from "react";
import type { BlockProps } from "#types/props";

export interface ISubmitArgs extends FormEvent<HTMLFormElement> {}

export interface IHTMLFormProps extends BlockProps<"form"> {}

export const HTMLForm = forwardRef<HTMLFormElement, IHTMLFormProps>(
  blockComponent<IHTMLFormProps>(styles.block, Component)
);

function Component(
  { children, ...blockProps }: IHTMLFormProps,
  ref?: LegacyRef<HTMLFormElement>
) {
  return (
    <form {...blockProps} ref={ref}>
      {children}
    </form>
  );
}
