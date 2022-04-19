import { blockComponent } from "#components/meta";
import { FormSection } from "./base";
import styles from "./_index.module.scss";

import type { FormSectionProps } from "./base";
import { HTMLInput } from "#components/html/input";

export interface IHiddenProps extends FormSectionProps {
  id?: string;
  name: string;
  required?: boolean;
}

export const Hidden = blockComponent(styles.hidden, Component);

function Component({
  id,
  name,
  defaultValue,
  required,
  ...blockProps
}: IHiddenProps) {
  return (
    <FormSection {...blockProps}>
      <HTMLInput
        id={id}
        name={name}
        type="hidden"
        required={required}
        defaultValue={defaultValue}
      />
    </FormSection>
  );
}
