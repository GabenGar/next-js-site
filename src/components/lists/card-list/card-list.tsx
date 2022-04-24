import { useState } from "react";
import { blockComponent } from "#components/meta";
import { Button } from "#components/fancy";
import { ItemList, listTypes, listLayouts, listLayoutKeys } from "./list";
import type { IListLayout } from "./list";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface ICardListProps extends BlockProps<"div"> {
  defaultLayout?: IListLayout;
  isLayoutShown?: boolean;
}

export const CardList = blockComponent(styles.block, Component);

function Component({
  isLayoutShown = true,
  defaultLayout,
  children,
  ...blockProps
}: ICardListProps) {
  const [currentLayout, changeCurrentLayout] = useState(defaultLayout);

  return (
    <div {...blockProps}>
      <ItemList type={listTypes.vertical} layout={currentLayout}>
        {children}
      </ItemList>

      {isLayoutShown && (
        <div>
          {listLayoutKeys.map((layout) => (
            <Button
              key={layout}
              className={styles.button}
              onClick={() => {
                if (layout !== currentLayout) {
                  changeCurrentLayout(layout);
                }
              }}
              disabled={layout === currentLayout}
            >
              {layout}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
