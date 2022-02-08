import clsx from "clsx";
import { blockComponent } from "#components/meta";
import { HTMLImg } from "#components/html/img";
import styles from "./_index.module.scss";

import type { CSSProperties } from "react";
import type { ISpanProps } from "#types/props";

export interface IImageProps extends ISpanProps {
  src?: string;
  alt?: string;
  height?: string;
}

export const Image = blockComponent<IImageProps>(
  styles.block,
  ({ src, alt = "", height = "30em", className, ...blockProps }) => {
    const isNoImage = !Boolean(src?.trim());

    return (
      <span
        className={clsx(className, isNoImage && styles.block_noImage)}
        {...blockProps}
        // react-typescript-friendly way of passing css variables
        style={{ "--local-height": height } as CSSProperties}
      >
        {isNoImage ? (
          <p>No Image Available</p>
        ) : (
          <HTMLImg className={styles.image} src={src} alt={alt} />
        )}
      </span>
    );
  }
);
