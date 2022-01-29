import { blockComponent } from "#components/meta";
import { useState } from "react";
import { Button } from "#components/fancy";
import { ItemList, listTypes, listLayouts } from "./list";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/base-props";
import type { ButtonClickEvent } from "#components/fancy";

interface Props extends BlockProps<"div"> {
  type?: string;
}

export const GalleryList = blockComponent<Props>(
  styles.block,
  ({ children, ...blockProps }) => {
    const [currentLayout, changeCurrentLayout] = useState(listLayouts.mobile);

    function switchLayout(layout: string) {
      return (event: ButtonClickEvent) => {
        if (layout !== currentLayout) {
          changeCurrentLayout(layout);
        }
      };
    }

    return (
      <div {...blockProps}>
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
);
