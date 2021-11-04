import { useClassName } from "#lib/hooks";
import { LocalAnchour, LocalPicture } from "#components/fancy";
import styles from "./_index.module.scss";

import type { LinkProps } from "next/link";

interface Props extends LinkProps {
  className?: string;
  src: string;
}

export function LocalImageLink({ href, src, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (
    <LocalAnchour href={href} className={blockClass} {...blockProps}>
      <LocalPicture className={styles.picture} src={src} />
    </LocalAnchour>
  );
}
