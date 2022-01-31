import { blockComponent } from "#components/meta";
import { FormSection, Label } from "#components/fancy/form";
import { TextInput } from "#components/fancy/input";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"fieldset"> {}

export const TextSection = blockComponent<Props>(
  styles.section,
  ({ id, name, children, ...blockProps }) => {
    return (
      <FormSection {...blockProps}>
        <Label htmlFor={id}>{children}</Label>
        <TextInput id={id} name={name} />
      </FormSection>
    );
  }
);
