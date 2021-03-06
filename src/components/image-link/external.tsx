import { blockComponent } from "#components/meta";
import { LinkExternal } from "#components/links";
import styles from "./_index.module.scss";

import type { LinkExternalProps } from "#components/links";

interface IImageLinkProps extends LinkExternalProps {
  src: string;
  alt?: string;
  srcSet?: string;
  isLazy?: boolean;
}

export const ImageLink = blockComponent<IImageLinkProps>(
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
