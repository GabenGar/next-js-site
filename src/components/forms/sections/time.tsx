import { blockComponent } from "#components/meta";
import { HTMLLabel } from "#components/html/label";
import { HTMLInput } from "#components/html/input";
import { FormSection } from "./base";
import styles from "./_index.module.scss";

import type { FormSectionProps } from "./base";

export interface IFormSectionTimeProps extends FormSectionProps {
  id: string;
  name: string;
  required?: boolean;
}

export const FormSectionTime = blockComponent<IFormSectionTimeProps>(
  styles.text,
  ({ id, name, defaultValue, required, children, ...blockProps }) => {
    return (
      <FormSection {...blockProps}>
        <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
        <HTMLInput
          id={id}
          name={name}
          type="time"
          required={required}
          defaultValue={defaultValue}
        />
      </FormSection>
    );
  }
);
