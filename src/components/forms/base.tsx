import { blockComponent } from "#components/meta";
import { HTMLForm } from "#components/html/form";
import { ButtonSubmit } from "#components/buttons";
import styles from "./_index.module.scss";

import type { FormEvent, ReactNode } from "react";
import type { HTMLFormProps } from "#components/html/form";

export interface FormProps extends HTMLFormProps {
  submitButton?: ReactNode;
}

/**
 * @link https://stackoverflow.com/questions/29907163/how-to-work-with-form-elements-in-typescript/70995964#70995964
 */
export type IFormElements<U extends string> = HTMLFormControlsCollection &
  Record<U, HTMLInputElement>;

/**
 * Convenience interface for submit event.
 */
export interface ISubmitEvent extends FormEvent<HTMLFormElement> {}

export const Form = blockComponent<FormProps>(
  styles.block,
  ({ submitButton = "Submit", children, ...blockProps }) => {
    return (
      <HTMLForm {...blockProps}>
        {children}
        {typeof submitButton === "string" ? (
          <ButtonSubmit>{submitButton}</ButtonSubmit>
        ) : (
          submitButton
        )}
      </HTMLForm>
    );
  }
);
