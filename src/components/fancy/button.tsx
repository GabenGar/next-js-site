import { useClassName } from "#lib/hooks";
import styles from "./button.module.scss";

import type { ButtonProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ButtonProps {}

export function Button({
  children,
  className,
  type = "button",
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.block, className);

  return (
    <button className={blockClass} type={type} {...blockProps}>
      {children}
    </button>
  );
}
