import { useClassName } from "#lib/hooks";
import styles from "./external.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLSpanElement> {
  src: string
  srcSet?: string
  alt?: string
  isLazy?: boolean
}

export function Picture({ src, alt = "", srcSet = src, isLazy = true, className, ...blockProps }: Props) {

  return (<span className={useClassName(styles.block, className)} {...blockProps}>
    <picture className={styles.picture}>
      <img className={styles.image} src={src} alt={alt} srcSet={srcSet}/>
    </picture>
  </span>);
}
