import { FormSection, Label } from "#components/fancy/form";
import { Select } from "#components/fancy/input";
import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { FieldSetProps } from "#types";

interface Props extends FieldSetProps {
  label: string;
}

export function SelectSection({
  label,
  id,
  name,
  children,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.section, className);

  return (
    <FormSection className={blockClass} {...blockProps}>
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} name={name}>
        {children}
      </Select>
    </FormSection>
  );
}
