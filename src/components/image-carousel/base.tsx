import { useState } from "react";
import clsx from "clsx";
import { blockComponent } from "#components/meta";
import { ImageLink } from "#components/image-link";
import { Button } from "#components/fancy";
import { Figure, FigCaption } from "#components/fancy/figure";
import styles from "./_index.module.scss";

import type { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  images: {
    src: string;
    href?: string;
    caption?: string;
  }[];
}

export const ImageCarousel = blockComponent<Props>(
  styles.block,
  ({ images, className, ...blockProps }) => {
    const [currentImage, changeCurrentImage] = useState(0);

    function prev() {
      changeCurrentImage(
        currentImage - 1 < 0 ? images.length - 1 : currentImage - 1
      );
    }
    function next() {
      changeCurrentImage(
        currentImage + 1 > images.length - 1 ? 0 : currentImage + 1
      );
    }
    return (
      <div {...blockProps}>
        <div className={styles.images}>
          {images.map((image, index) => (
            <Figure
              key={index}
              className={clsx(
                styles.image,
                index === currentImage && styles.image_shown
              )}
            >
              <FigCaption>{image.caption}</FigCaption>
              <ImageLink
                src={image.src}
                href={image.href}
                isLazy={!(index === currentImage ?? false)}
              />
            </Figure>
          ))}
        </div>

        {images.length > 1 && (
          <div className={styles.buttons}>
            <Button className={styles.button} onClick={prev}>
              Previous
            </Button>
            <span>
              <span>{currentImage + 1}</span> / <span>{images.length}</span>
            </span>
            <Button className={styles.button} onClick={next}>
              Next
            </Button>
          </div>
        )}
      </div>
    );
  }
);
