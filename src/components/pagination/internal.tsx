import { useTranslation } from "next-i18next";
import { blockComponent } from "#components/meta";
import { LinkButton } from "#components/links";
import { List, ListItem } from "#components/lists";
import styles from "./internal.module.scss";

import type { IPagination } from "#lib/pagination";
import type { BlockProps } from "#types/props";

interface IPaginationClient extends IPagination {}

export interface IPaginationInternalProps extends BlockProps<"div"> {
  pagination: IPagination;
}

/**
 * For use in server-rendered collections. Page buttons are {@link LinkInternal internal links} styled as link buttons.
 */
export const PaginationInternal = blockComponent(styles.block, Component);

function Component({ pagination, ...blockProps }: IPaginationInternalProps) {
  const { t } = useTranslation("components");
  const { totalPages, currentPage, limit, totalCount } = pagination;
  const currentSelectionMin = (totalPages - 1) * limit;
  const currentSelectionMax =
    currentSelectionMin + limit > totalCount
      ? totalCount
      : currentSelectionMin + limit;

  return (
    <div {...blockProps}>
      <p>
        Showing {currentSelectionMin}-{currentSelectionMax} out of {totalCount}{" "}
        entries.
      </p>

      <List className={styles.pages}>
        <Page>
          {currentPage === 1 ? 1 : <LinkButton href="/">1</LinkButton>}
        </Page>

        <Page>
          {currentPage === 1 ? (
            "..."
          ) : (
            <LinkButton href="/">{currentPage - 1}</LinkButton>
          )}
        </Page>

        <Page>{currentPage}</Page>
        <Page>
          {currentPage === totalPages ? (
            "..."
          ) : (
            <LinkButton href="/">{currentPage + 1}</LinkButton>
          )}
        </Page>

        <Page>
          {currentPage === totalPages ? (
            totalPages
          ) : (
            <LinkButton href="/">{totalPages}</LinkButton>
          )}
        </Page>
      </List>
    </div>
  );
}

function Page({ children = undefined }: { children?: any }) {
  return <ListItem className={styles.page}>{children}</ListItem>;
}
