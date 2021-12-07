import { FormSection, SubmitButton } from "#components/fancy/form";
import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"fieldset"> {
}

export function SubmitSection({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.section, className);

  return (<FormSection
    className={blockClass} {...blockProps}
  >
    <SubmitButton>
      {children}
    </SubmitButton>
  </FormSection>);
}
