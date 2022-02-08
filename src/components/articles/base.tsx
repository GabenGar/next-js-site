import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface IArticleProps extends BlockProps<"article"> {
  level?: number;
}
export interface IArticleHeaderProps extends BlockProps<"header"> {}
export interface IArticleBodyProps extends BlockProps<"section"> {}
export interface IArticleFooterProps extends BlockProps<"footer"> {}

export const Article = blockComponent<IArticleProps>(
  styles.block,
  ({ children, ...blockProps }) => {
    return <article {...blockProps}>{children}</article>;
  }
);

export const ArticleHeader = blockComponent<IArticleHeaderProps>(
  styles.header,
  ({ children, ...blockProps }) => {
    return <header {...blockProps}>{children}</header>;
  }
);

export const ArticleBody = blockComponent<IArticleBodyProps>(
  styles.body,
  ({ children, ...blockProps }) => {
    return <section {...blockProps}>{children}</section>;
  }
);

export const ArticleFooter = blockComponent<IArticleFooterProps>(
  styles.footer,
  ({ children, ...blockProps }) => {
    return <footer {...blockProps}>{children}</footer>;
  }
);
