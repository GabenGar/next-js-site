import Image from "next/image";
import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { ElementProps } from "#types";

interface LocalProps extends ElementProps<HTMLSpanElement> {
  src: string;
  srcset?: string;
  alt?: string;
}

export function LocalPicture({
  src,
  alt = "",
  className,
  ...blockProps
}: LocalProps) {
  const blockClass = useClassName(styles.block, className);
  return (
    <span className={blockClass} {...blockProps}>
      <picture>
        <Image src={src} alt={alt} />
      </picture>
    </span>
  );
}
