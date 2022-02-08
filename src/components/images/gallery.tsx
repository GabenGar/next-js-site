import { useState } from "react";
import clsx from "clsx";
import { blockComponent } from "#components/meta";
import { HTMLDiv } from "#components/html/div";
import { HTMLFigure } from "#components/html/figure";
import { HTMLFigCaption } from "#components/html/figcaption";
import { HTMLSpan } from "#components/html/span";
import { Button } from "#components/buttons";
import { Image } from "./base";
import styles from "./gallery.module.scss";

import type { ReactNode } from "react";
import type { HTMLDivProps } from "#components/html/div";

export interface IGalleryItem {
  src: string;
  caption?: string;
}

export interface IGalleryProps extends HTMLDivProps {
  galleryTitle?: ReactNode;
  galleryItems: IGalleryItem[];
}

export const Gallery = blockComponent<IGalleryProps>(
  styles.block,
  ({ galleryTitle, galleryItems, ...blockProps }) => {
    const isNoImages = !galleryItems.length;
    const isOneOrNoImage = galleryItems.length <= 1;
    const [selectedItem, changeSelectedItem] = useState(0);

    function prevItem() {
      if (isOneOrNoImage) {
        return;
      }
      const prevItem =
        selectedItem === 0 ? galleryItems.length - 1 : selectedItem - 1;
      changeSelectedItem(prevItem);
    }
    function nextItem() {
      if (isOneOrNoImage) {
        return;
      }
      const nextItem =
        selectedItem === galleryItems.length - 1 ? 0 : selectedItem + 1;
      changeSelectedItem(nextItem);
    }

    return (
      <HTMLDiv {...blockProps}>
        <HTMLDiv className={styles.title}>{galleryTitle}</HTMLDiv>
        <HTMLDiv className={styles.items}>
          {isNoImages ? (
            <HTMLFigure className={clsx(styles.item, styles.item_selected)}>
              <Image alt="" />
            </HTMLFigure>
          ) : (
            galleryItems.map((galleryItem, index) => (
              <HTMLFigure
                key={galleryItem.src + index}
                className={clsx(
                  styles.item,
                  index === selectedItem && styles.item_selected
                )}
              >
                <Image src={galleryItem.src} alt="" />
                {galleryItem.caption && (
                  <HTMLFigCaption>{galleryItem.caption}</HTMLFigCaption>
                )}
              </HTMLFigure>
            ))
          )}
        </HTMLDiv>
        {!isOneOrNoImage && (
          <HTMLDiv className={styles.buttons}>
            <Button className={styles.button} onClick={prevItem}>
              Prev
            </Button>
            <HTMLSpan>
              {selectedItem + 1}/{galleryItems.length}
            </HTMLSpan>
            <Button className={styles.button} onClick={nextItem}>
              Next
            </Button>
          </HTMLDiv>
        )}
      </HTMLDiv>
    );
  }
);
