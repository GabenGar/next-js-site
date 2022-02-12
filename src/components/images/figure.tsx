import { blockComponent } from "#components/meta";
import { Figure } from "#components/fancy/figure";
import { Image } from "#components/images";
import styles from "./_index.module.scss";

import type { ReactNode } from "react";
import type { IFigureProps } from "#components/fancy/figure";

export interface IImageFigureProps extends IFigureProps {
  src: string | StaticImageData;
  alt?: string;
  figCaption?: ReactNode;
  imageHeight?: string;
}

export const ImageFigure = blockComponent<IImageFigureProps>(
  styles.block,
  ({ src, alt, figCaption, imageHeight, ...blockProps }) => {
    return (
      <Figure {...blockProps}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          imageHeight={imageHeight}
        />
      </Figure>
    );
  }
);
