import { useClassName } from "#lib/hooks";
import { Button } from "#components/fancy";
import styles from "./_index.module.scss";

import type { ButtonProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ButtonProps {}

export function SubmitButton({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.submit, className);

  return (
    <Button className={blockClass} {...blockProps} type="submit">
      {children}
    </Button>
  );
}
