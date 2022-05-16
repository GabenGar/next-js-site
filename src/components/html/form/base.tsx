import { forwardRef, useState } from "react";
import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { FormEvent, LegacyRef } from "react";
import type { BlockProps } from "#types/props";

export interface ISubmitEvent extends FormEvent<HTMLFormElement> {}

export interface IHTMLFormProps extends BlockProps<"form"> {}

export const HTMLForm = forwardRef<HTMLFormElement, IHTMLFormProps>(
  blockComponent<IHTMLFormProps>(styles.block, Component)
);

function Component(
  { onSubmit, children, ...blockProps }: IHTMLFormProps,
  ref?: LegacyRef<HTMLFormElement>
) {
  const [isSubmitting, switchSubmitState] = useState(false);

  async function handleSubmit(event: ISubmitEvent) {
    if (isSubmitting) {
      event.preventDefault();
      return;
    }

    switchSubmitState(true);

    if (onSubmit) {
      try {
        await Promise.resolve(onSubmit(event));
        switchSubmitState(false);
      } catch (error) {
        console.error(error);
        switchSubmitState(false);
      }
    }
  }

  return (
    <form {...blockProps} onSubmit={handleSubmit} ref={ref}>
      {children}
    </form>
  );
}
