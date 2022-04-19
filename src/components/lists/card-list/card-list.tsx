import { useState } from "react";
import { blockComponent } from "#components/meta";
import { Button } from "#components/fancy";
import { ItemList, listTypes, listLayouts } from "./list";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface ICardListProps extends BlockProps<"div"> {
  isLayoutShown?: boolean;
}

export const CardList = blockComponent(styles.block, Component);

function Component({
  isLayoutShown = true,
  children,
  ...blockProps
}: ICardListProps) {
  const [currentLayout, changeCurrentLayout] = useState(listLayouts.mobile);

  return (
    <div {...blockProps}>
      <ItemList type={listTypes.vertical} layout={currentLayout}>
        {children}
      </ItemList>

      {isLayoutShown && (
        <div>
          {Object.entries(listLayouts).map(([name, layout]) => (
            <Button
              key={name}
              className={styles.button}
              onClick={() => {
                if (layout !== currentLayout) {
                  changeCurrentLayout(layout);
                }
              }}
              disabled={layout === currentLayout}
            >
              {name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
