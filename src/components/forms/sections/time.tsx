import { getHours, getMinutes, getSeconds } from "date-fns";
import { blockComponent } from "#components/meta";
import { HTMLLabel } from "#components/html/label";
import { HTMLInput } from "#components/html/input";
import { FormSection } from "./base";
import styles from "./_index.module.scss";

import type { FormSectionProps } from "./base";

export interface IFormSectionTimeProps
  extends Omit<FormSectionProps, "defaultValue"> {
  id: string;
  name: string;
  required?: boolean;
  defaultValue?: Date;
  min?: string;
  max?: string;
}

export const FormSectionTime = blockComponent<IFormSectionTimeProps>(
  styles.text,
  ({
    id,
    name,
    min = "00:00",
    max = "23:59",
    defaultValue,
    required,
    children,
    ...blockProps
  }) => {
    // doing this because `toISODate()` adds timezones
    // which this element doesn't like
    const formattedDefaultValue =
      defaultValue &&
      [
        String(getHours(defaultValue)).padStart(2, "0"),
        String(getMinutes(defaultValue)).padStart(2, "0"),
      ].join(":");

    return (
      <FormSection {...blockProps}>
        <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
        <HTMLInput
          id={id}
          className={styles.time}
          name={name}
          type="time"
          min={min}
          max={max}
          required={required}
          defaultValue={formattedDefaultValue}
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#handling_browser_support
          pattern="[0-9]{2}:[0-9]{2}"
        />
      </FormSection>
    );
  }
);
