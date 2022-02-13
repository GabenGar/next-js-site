import { useState } from "react";
import clsx from "clsx";
import { blockComponent } from "#components/meta";
import { Figure, FigCaption } from "#components/fancy/figure";
import { Button } from "#components/buttons";
import { Image } from "./base";
import styles from "./gallery.module.scss";

import type { ReactNode } from "react";
import type { IDivProps } from "#types/props";

export interface IGalleryItem {
  src: string;
  caption?: string;
}

export interface IGalleryProps extends IDivProps {
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
      <div {...blockProps}>
        <div className={styles.title}>{galleryTitle}</div>
        <div className={styles.items}>
          {isNoImages ? (
            <Figure className={clsx(styles.item, styles.item_selected)}>
              <Image src="" alt="No images present." />
            </Figure>
          ) : (
            galleryItems.map((galleryItem, index) => (
              <Figure
                key={galleryItem.src + index}
                className={clsx(
                  styles.item,
                  index === selectedItem && styles.item_selected
                )}
              >
                <Image src={galleryItem.src} alt="" />
                {galleryItem.caption && (
                  <FigCaption>{galleryItem.caption}</FigCaption>
                )}
              </Figure>
            ))
          )}
        </div>
        {!isOneOrNoImage && (
          <div className={styles.buttons}>
            <Button className={styles.button} onClick={prevItem}>
              Prev
            </Button>
            <span>
              {selectedItem + 1}/{galleryItems.length}
            </span>
            <Button className={styles.button} onClick={nextItem}>
              Next
            </Button>
          </div>
        )}
      </div>
    );
  }
);
