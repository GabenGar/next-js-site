import { useClassName } from "#lib/hooks";
import { Button } from "#components/fancy";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"button"> {}

export function SubmitButton({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.submit, className);

  return (
    <Button className={blockClass} {...blockProps} type="submit">
      {children}
    </Button>
  );
}
