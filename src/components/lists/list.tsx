import { blockComponent } from "#components/meta";
import { HTMLUl } from "#components/html/ul";
import { HTMLOl } from "#components/html/ol";
import { HTMLLi } from "#components/html/li";
import styles from "./list.module.scss"

import type { HTMLUlProps } from "#components/html/ul";
import type { HTMLOlProps } from "#components/html/ol";
import type { HTMLLiProps } from "#components/html/li";

export type IListProps = HTMLUlProps &
  HTMLOlProps & {
    isOrdered?: boolean;
  };

export const List = blockComponent<IListProps>(
  styles.block,
  ({ isOrdered = false, children, ...blockProps }) => {
    return isOrdered ? (
      <HTMLOl {...blockProps}>{children}</HTMLOl>
    ) : (
      <HTMLUl {...blockProps}>{children}</HTMLUl>
    );
  }
);
