import Image from 'next/image';
import { useClassName } from "#lib/hooks";
import styles from "./local.module.scss";

import type { ElementProps } from "#types";

interface LocalProps extends ElementProps<HTMLSpanElement> {
  src: string
  srcset?: string
  alt?: string
}

export function LocalPicture({ src, alt = "", className, ...blockProps }: LocalProps) {

  return (<span className={useClassName(styles.block, className)} {...blockProps}>
    <picture>
      <Image src={src} alt={alt}/>
    </picture>
  </span>
  );
}
