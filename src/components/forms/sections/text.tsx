import { blockComponent } from "#components/meta";
import { HTMLLabel } from "#components/html/label";
import { HTMLInput } from "#components/html/input";
import { FormSection } from "./base";
import styles from "./_index.module.scss";

import type { FormSectionProps } from "./base";

export interface ITextProps extends FormSectionProps {
  id: string;
  name: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  readOnly?: boolean;
}

/**
 * @TODO rename
 */
export const Text = blockComponent<ITextProps>(
  styles.text,
  ({
    id,
    name,
    defaultValue,
    minLength,
    maxLength,
    pattern,
    readOnly,
    required,
    children,
    ...blockProps
  }) => {
    return (
      <FormSection {...blockProps}>
        <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
        <HTMLInput
          id={id}
          name={name}
          type="text"
          required={required}
          defaultValue={defaultValue}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          readOnly={readOnly}
        />
      </FormSection>
    );
  }
);
