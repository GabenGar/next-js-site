import { Children } from "react";
import { Button } from "#components/fancy";
import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLDivElement> {}

export function ImageCarousel({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);
  const images = Children.toArray(children);

  function next() {}
  function prev() {}

  return (
    <div className={blockClass} {...blockProps}>
      <div>
        {images.map((image) => (
          <figure>
            <figcaption></figcaption>
            {image}
          </figure>
        ))}
      </div>

      <div className={styles.buttons}>
        <Button onClick={prev}>Previous</Button>
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  );
}
