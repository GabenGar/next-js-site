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
}

export const TextArea = blockComponent<ITextAreaProps>(
  styles.text,
  ({ id, name, defaultValue, required, children, ...blockProps }) => {
    return (
      <FormSection {...blockProps}>
        <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
        <HTMLTextArea
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue}
        />
      </FormSection>
    );
  }
);
