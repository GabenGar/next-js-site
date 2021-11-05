import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLSpanElement> {
  src: string;
  srcSet?: string;
  alt?: string;
  isLazy?: boolean;
}

export function Picture({
  src,
  alt = "",
  srcSet = src,
  isLazy = true,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.block, className);
  return (
    <span className={blockClass} {...blockProps}>
      <picture className={styles.picture}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={src}
          alt={alt}
          srcSet={srcSet}
          loading={isLazy ? "lazy" : "eager"}
        />
      </picture>
    </span>
  );
}
