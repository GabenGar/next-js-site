import { useTranslation } from "next-i18next";
import { blockComponent } from "#components/meta";
import { HTMLForm } from "#components/html/form";
import { ButtonSubmit } from "#components/buttons";
import styles from "./_index.module.scss";

import type { FormEvent, ReactNode } from "react";
import type { HTMLFormProps } from "#components/html/form";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
const formMethods = ["GET", "POST"] as const;
export type IMethod = typeof methods[number];
export type IFormMethod = typeof formMethods[number];

export interface IFormProps extends HTMLFormProps {
  /**
   * Submit button component.
   * If a react component is passed,
   * then replaces the button with said component,
   * otherwise it becomes the content of {@link ButtonSubmit submit button}.
   */
  submitButton?: ReactNode;
  method?: IFormMethod;
}

/**
 * Convenience type for `HTMLFormElement.elements`
 * @link https://stackoverflow.com/questions/29907163/how-to-work-with-form-elements-in-typescript/70995964#70995964
 */
export type IFormElements<U extends string> = HTMLFormControlsCollection &
  Record<U, HTMLInputElement>;

/**
 * Convenience interface for submit event.
 */
export interface ISubmitEvent extends FormEvent<HTMLFormElement> {}

export const Form = blockComponent<IFormProps>(styles.block, Component);

function Component({ submitButton, children, ...blockProps }: IFormProps) {
  const { t } = useTranslation("components");
  const finalSubmit = submitButton || t("submit");

  return (
    <HTMLForm {...blockProps}>
      {children}
      {typeof finalSubmit === "string" || typeof finalSubmit === "number" ? (
        <ButtonSubmit>{finalSubmit}</ButtonSubmit>
      ) : (
        finalSubmit
      )}
    </HTMLForm>
  );
}
