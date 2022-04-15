import clsx from "clsx";
import { blockComponent } from "#components/meta";
import { HTMLImg } from "#components/html/img";
import { ImageLocal } from "./local";
import styles from "./_index.module.scss";

import type { CSSProperties } from "react";
import type { StaticImageData } from "next/image";
import type { ISpanProps } from "#types/props";

/**
 * The separation is solely due to `next/image` component.
 */
const imageLinkTypes = ["external", "internal"] as const;
export type IImageLinkTypes = typeof imageLinkTypes[number];

export interface IImageProps extends ISpanProps {
  src: string | StaticImageData;
  alt?: string;
  imageHeight?: string;
  type?: IImageLinkTypes;
}
interface IInnerImageProps {
  type: IImageLinkTypes;
  src: string | StaticImageData;
  alt?: string;
  /**
   * Used to limit the size of local image due its API.
   */
  imageHeight?: string;
}

/**
 * @todo: Refactor `Image` components in `fancy` and `html` folders.
 */
export const Image = blockComponent<IImageProps>(
  styles.block,
  ({ src, alt = "", imageHeight = "30em", type, className, ...blockProps }) => {
    const isImage = Boolean(
      typeof src === "object" || (typeof src === "string" && src.trim())
    );
    const imgType = type || guessImageLinkType(src);

    return (
      <span
        className={clsx(className, !isImage && styles.block_noImage)}
        {...blockProps}
        // react-typescript-friendly way of passing css variables
        style={{ "--local-height": imageHeight } as CSSProperties}
      >
        {!isImage ? (
          <p>No Image Available</p>
        ) : (
          <InnerImage src={src} alt={alt} type={imgType} imageHeight={imageHeight} />
        )}
      </span>
    );
  }
);

function InnerImage({ type, src, alt, imageHeight }: IInnerImageProps) {
  switch (type) {
    case "internal": {
      return (
        <ImageLocal
          className={styles.image}
          src={src}
          alt={alt}
          layout="fill"
        />
      );
    }

    case "external":
    default: {
      return <HTMLImg className={styles.image} src={src as string} alt={alt} />;
    }
  }
}

function guessImageLinkType(src: string | StaticImageData): IImageLinkTypes {
  if (typeof src === "object") {
    return "internal";
  }

  return "external";
}
