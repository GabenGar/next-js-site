import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { ImgProps } from "#types";

interface Props extends ImgProps {}

export function IMG({ className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.image, className);

  return <img className={blockClass} {...blockProps}/>;
}