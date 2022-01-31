import clsx from "clsx";
import { Button } from "#components/fancy";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"button"> {}

export function SubmitButton({ children, className, ...blockProps }: Props) {
  const blockClass = clsx(styles.submit, className);

  return (
    <Button className={blockClass} {...blockProps} type="submit">
      {children}
    </Button>
  );
}
