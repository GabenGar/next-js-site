import { blockComponent } from "#components/meta";
import { HTMLLabel } from "#components/html/label";
import { FormSection } from "./base";
import styles from "./select.module.scss";

import type { BlockProps } from "#types/props";
import type { FormSectionProps } from "./base";

export interface IOptionProps extends BlockProps<"option"> {
  optionTitle?: string;
}

export interface ISelectProps extends FormSectionProps {
  id: string;
  name: string;
  required?: boolean;
  options: IOptionProps[];
}

export const Select = blockComponent<ISelectProps>(
  styles.block,
  ({ id, name, options, defaultValue, required, children, ...blockProps }) => {
    return (
      <FormSection {...blockProps}>
        <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
        <select
          id={id}
          className={styles.select}
          name={name}
          required={required}
          defaultValue={defaultValue ?? options[0]?.value}
        >
          {options.map(({ optionTitle, value, ...optionProps }, index) => (
            <option key={index} value={value} {...optionProps}>
              {optionTitle ?? value}
            </option>
          ))}
        </select>
      </FormSection>
    );
  }
);
