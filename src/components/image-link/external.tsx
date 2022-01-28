import { blockComponent } from "#components/meta";
import { LinkExternal } from "#components/links";
import styles from "./_index.module.scss";

import type { ExternalProps } from "#components/links";

interface Props extends ExternalProps {
  src: string;
  href?: string;
  alt?: string;
  srcSet?: string;
  isLazy?: boolean;
}

export const ImageLink = blockComponent<Props>(
  styles.block,
  ({
    src,
    href = src,
    alt = "",
    srcSet = src,
    isLazy = true,
    ...blockProps
  }) => {
    return (
      <LinkExternal href={href} {...blockProps}>
        <picture>
          <img
            className={styles.image}
            src={src}
            alt={alt}
            srcSet={srcSet}
            loading={isLazy ? "lazy" : "eager"}
          />
        </picture>
      </LinkExternal>
    );
  }
);
