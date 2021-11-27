import { blockComponent } from "#components";
import { Anchour } from "#components/fancy";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"a"> {
  src: string;
  href?: string;
  alt?: string;
  srcSet?: string;
  isLazy?: boolean;
}

blockComponent;

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
      <Anchour href={href} {...blockProps}>
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
);
