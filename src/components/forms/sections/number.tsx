import clsx from "clsx";
import { useClient } from "#lib/hooks";
import { blockComponent } from "#components/meta";
import { HTMLLabel } from "#components/html/label";
import { HTMLInput } from "#components/html/input";
import { FormSection } from "./base";
import styles from "./number.module.scss";

import type { Ref } from "react";
import type { FormSectionProps } from "./base";

export interface INumberProps extends FormSectionProps {
  id: string;
  name: string;
  required?: boolean;
  isReadOnly?: boolean;
  minValue?: number;
  maxValue?: number;
  valueStep?: number;
  inputRef?: Ref<HTMLInputElement>;
}

export const Number = blockComponent(styles.block, Component);

function Component({
  id,
  name,
  defaultValue,
  isReadOnly,
  required,
  children,
  minValue,
  maxValue,
  valueStep,
  inputRef,
  ...blockProps
}: INumberProps) {
  const { isClient } = useClient();

  return (
    <FormSection {...blockProps}>
      <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
      <HTMLInput
        id={id}
        className={clsx(isClient && styles.input_client)}
        name={name}
        type="number"
        required={required}
        defaultValue={defaultValue}
        readOnly={isReadOnly}
        min={minValue}
        max={maxValue}
        step={valueStep}
        ref={inputRef}
      />
    </FormSection>
  );
}
