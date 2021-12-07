import { blockComponent } from "#components";
import { FormSection, Label } from "#components/fancy/form";
import { Select } from "#components/fancy/input";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"fieldset"> {
  label: string;
}

export const SelectSection = blockComponent<Props>(
  styles.block,
  ({ label, id, name, children, ...blockProps }) => {
    return (
      <FormSection {...blockProps}>
        <Label htmlFor={id}>{label}</Label>
        <Select id={id} className={styles.select} name={name}>
          {children}
        </Select>
      </FormSection>
    );
  }
);
