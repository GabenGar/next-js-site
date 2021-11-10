import { useState } from "react";
import { ImageLink } from "#components";
import { Button, Figure, FigCaption } from "#components/fancy";
import { useClassName } from "#lib/hooks";
import { useClassList } from "#lib/util";
import styles from "./_index.module.scss";

import type { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  images: {
    src: string;
    href?: string;
    caption?: string;
  }[];
}

export function ImageCarousel({ images, className, ...blockProps }: Props) {
  const [currentImage, changeCurrentImage] = useState(0);
  const blockClass = useClassName(styles.block, className);

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
    <div className={blockClass} {...blockProps}>
      <div className={styles.images}>
        {images.map((image, index) => (
          <Figure
            key={index}
            className={useClassList(
              styles.image,
              index === currentImage ? styles.image_shown : undefined
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
