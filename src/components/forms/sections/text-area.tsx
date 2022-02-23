import { blockComponent } from "#components/meta";
import { HTMLLabel } from "#components/html/label";
import { HTMLTextArea } from "#components/html/textarea";
import { FormSection } from "./base";
import styles from "./_index.module.scss";

import type { FormSectionProps } from "./base";

export interface ITextAreaProps extends FormSectionProps {
  id: string;
  name: string;
  required?: boolean;
  rows?: number;
  readOnly?: boolean;
  minLength?: number;
  maxLength?: number;
}

export const TextArea = blockComponent<ITextAreaProps>(
  styles.text,
  ({
    id,
    name,
    defaultValue,
    required,
    readOnly,
    rows,
    children,
    minLength,
    maxLength,
    ...blockProps
  }) => {
    return (
      <FormSection {...blockProps}>
        <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
        <HTMLTextArea
          id={id}
          className={styles.textArea}
          name={name}
          required={required}
          defaultValue={defaultValue}
          rows={rows}
          readOnly={readOnly}
          minLength={minLength}
          maxLength={maxLength}
        />
      </FormSection>
    );
  }
);
