import clsx from "clsx";
import { blockComponent } from "#components/meta";
import { HTMLImg } from "#components/html/img";
import { ImageLocal } from "./local";
import styles from "./_index.module.scss";

import type { CSSProperties } from "react";
import type { ISpanProps } from "#types/props";

/**
 * The separation is solely due to `next/image` component.
 */
const imageLinkTypes = ["external", "internal"] as const;
export type IImageLinkTypes = typeof imageLinkTypes[number];

export interface IImageProps extends ISpanProps {
  src: string | StaticImageData;
  alt?: string;
  height?: string;
  type?: IImageLinkTypes;
}
interface IInnerImageProps {
  type: IImageLinkTypes;
  src: string | StaticImageData;
  alt?: string;
}

export const Image = blockComponent<IImageProps>(
  styles.block,
  ({ src, alt = "", height = "30em", type, className, ...blockProps }) => {
    const isNoImage = !Boolean(typeof src === "string" && src.trim());
    const imgType = type || guessImageLinkType(src);

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
          <InnerImage src={src} alt={alt} type={imgType} />
        )}
      </span>
    );
  }
);

function InnerImage({ type, src, alt }: IInnerImageProps) {
  switch (type) {

    case "internal": {
      return <ImageLocal src={src} />;
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
