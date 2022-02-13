import { blockComponent } from "#components/meta";
import { Figure, FigCaption } from "#components/fancy/figure";
import { Image } from "#components/images";
import styles from "./figure.module.scss";

import type { CSSProperties, ReactNode } from "react";
import type { IFigureProps } from "#components/fancy/figure";

export interface IImageFigureProps extends IFigureProps {
  src: string | StaticImageData;
  alt?: string;
  figCaption?: ReactNode;
  imageHeight?: string;
  maxWidth?: string;
}

export const ImageFigure = blockComponent<IImageFigureProps>(
  styles.block,
  ({
    src,
    alt,
    figCaption,
    imageHeight,
    maxWidth = "360px",
    ...blockProps
  }) => {
    return (
      <Figure
        {...blockProps}
        style={{ "--local-max-width": maxWidth } as CSSProperties}
      >
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          imageHeight={imageHeight}
        />
        {figCaption && <FigCaption>{figCaption}</FigCaption>}
      </Figure>
    );
  }
);
