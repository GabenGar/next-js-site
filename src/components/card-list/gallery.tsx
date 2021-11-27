import { useState } from "react";
import { useClassName } from "#lib/hooks";
import { Button } from "#components/fancy";
import { ItemList, listTypes, listLayouts } from "./list";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";
import type { ButtonClickEvent } from "#components/fancy";

interface Props extends BlockProps<"div"> {
  type?: string;
}

export function GalleryList({ children, className, ...blockProps }: Props) {
  const [currentLayout, changeCurrentLayout] = useState(listLayouts.mobile);
  const blockClass = useClassName(styles.block, className);

  function switchLayout(layout: string) {
    return (event: ButtonClickEvent) => {
      if (layout !== currentLayout) {
        changeCurrentLayout(layout);
      }
    };
  }

  return (
    <div className={blockClass} {...blockProps}>
      <ItemList type={listTypes.horizontal} layout={currentLayout}>
        {children}
      </ItemList>
      <div>
        {Object.entries(listLayouts).map(([name, layout]) => (
          <Button
            key={name}
            onClick={switchLayout(layout)}
            disabled={layout === currentLayout}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}