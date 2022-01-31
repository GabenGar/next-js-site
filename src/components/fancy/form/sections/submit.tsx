import clsx from "clsx";
import { FormSection, SubmitButton } from "#components/fancy/form";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"fieldset"> {
}

export function SubmitSection({ children, className, ...blockProps }: Props) {
  const blockClass = clsx(styles.section, className);

  return (<FormSection
    className={blockClass} {...blockProps}
  >
    <SubmitButton>
      {children}
    </SubmitButton>
  </FormSection>);
}
