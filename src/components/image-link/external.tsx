import { useClassName } from "#lib/hooks";
import { Anchour } from "#components/fancy";
import styles from "./_index.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLAnchorElement> {
  href: string;
  src: string;
  alt?: string;
  srcSet?: string;
  isLazy?: boolean;
}

export function ImageLink({
  href,
  src,
  alt = "",
  srcSet = src,
  isLazy = true,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.block, className);

  return (
    <Anchour href={href} className={blockClass} {...blockProps}>
      <picture>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={src}
          alt={alt}
          srcSet={srcSet}
          loading={isLazy ? "lazy" : "eager"}
        />
      </picture>
    </Anchour>
  );
}
