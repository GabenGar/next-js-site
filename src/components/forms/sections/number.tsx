import { blockComponent } from "#components/meta";
import { HTMLLabel } from "#components/html/label";
import { HTMLInput } from "#components/html/input";
import { FormSection } from "./base";
import styles from "./number.module.scss";

import type { FormSectionProps } from "./base";

export interface INumberProps extends FormSectionProps {
  id: string;
  name: string;
  required?: boolean;
  isReadOnly?: boolean;
  minValue?: number;
  maxValue?: number;
  valueStep?: number;
}

export const Number = blockComponent<INumberProps>(
  styles.block,
  ({
    id,
    name,
    defaultValue,
    isReadOnly,
    required,
    children,
    minValue,
    maxValue,
    valueStep,
    ...blockProps
  }) => {
    return (
      <FormSection {...blockProps}>
        <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
        <HTMLInput
          id={id}
          name={name}
          type="number"
          required={required}
          defaultValue={defaultValue}
          readOnly={isReadOnly}
          min={minValue}
          max={maxValue}
          step={valueStep}
        />
      </FormSection>
    );
  }
);
