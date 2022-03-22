import { blockComponent } from "#components/meta";
import { HTMLLabel } from "#components/html/label";
import { HTMLInput } from "#components/html/input";
import { FormSection } from "./base";
import styles from "./_index.module.scss";

import type { FormSectionProps } from "./base";

export interface IDateTimeProps extends FormSectionProps {
  id: string;
  name: string;
  required?: boolean;
  minDate?: string;
  max?: string;
}

/**
 * @TODO: make it work with timezones
 */
export const DateTime = blockComponent<IDateTimeProps>(
  styles.text,
  ({
    id,
    name,
    minDate,
    max,
    defaultValue,
    required,
    children,
    ...blockProps
  }) => {


    return (
      <FormSection {...blockProps}>
        <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
        <HTMLInput
          id={id}
          className={styles.time}
          name={name}
          type="datetime-local"
          min={minDate}
          max={max}
          required={required}
          defaultValue={defaultValue}
        />
      </FormSection>
    );
  }
);
