import { blockComponent } from "#components/meta";
import { Figure, FigCaption } from "#components/fancy/figure";
import { Image, ImageLink } from "#components/images";
import styles from "./figure.module.scss";

import type { CSSProperties, ReactNode } from "react";
import type { IFigureProps } from "#components/fancy/figure";

export interface IImageFigureProps extends IFigureProps {
  src: string | StaticImageData;
  alt?: string;
  href?: string | URL;
  figCaption?: ReactNode;
  imageHeight?: string;
  maxWidth?: string;
}

export const ImageFigure = blockComponent<IImageFigureProps>(
  styles.block,
  ({
    src,
    alt,
    href,
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
        <ImageLink
          className={styles.image}
          linkHref={href}
          imageSrc={src}
          imageAlt={alt}
          imageHeight={imageHeight}
        />
        {figCaption && <FigCaption>{figCaption}</FigCaption>}
      </Figure>
    );
  }
);
