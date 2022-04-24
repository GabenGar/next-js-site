import { useState } from "react";
import { blockComponent } from "#components/meta";
import { Button } from "#components/fancy";
import { ItemList, listTypes, listLayoutKeys } from "./list";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";
import type { ButtonClickEvent } from "#components/fancy";
import type { IListLayout } from "./list";

interface Props extends BlockProps<"div"> {
  type?: string;
}

export const GalleryList = blockComponent<Props>(
  styles.block,
  ({ children, ...blockProps }) => {
    const [currentLayout, changeCurrentLayout] =
      useState<IListLayout>("mobile");

    function switchLayout(layout: IListLayout) {
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
          {listLayoutKeys.map((layout) => (
            <Button
              key={layout}
              onClick={switchLayout(layout)}
              disabled={layout === currentLayout}
            >
              {layout}
            </Button>
          ))}
        </div>
      </div>
    );
  }
);
