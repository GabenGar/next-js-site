import { FormSection, Label } from "#components/fancy/form";
import { TextInput } from "#components/fancy/input";
import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { FieldSetProps } from "#types";

interface Props extends FieldSetProps {}

export function TextSection({
  id,
  name,
  children,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.section, className);

  return (
    <FormSection className={blockClass} {...blockProps}>
      <Label htmlFor={id}>{children}</Label>
      <TextInput id={id} name={name} />
    </FormSection>
  );
}
