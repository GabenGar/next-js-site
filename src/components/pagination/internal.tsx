import { useTranslation } from "next-i18next";
import { ProjectURL } from "#lib/url";
import { blockComponent } from "#components/meta";
import { List, ListItem } from "#components/lists";
import { LinkButton } from "#components/links";
import styles from "./internal.module.scss";

import type { IPagination } from "#lib/pagination";
import type { BlockProps } from "#types/props";

interface IPaginationClient extends IPagination {}

type IURLBuilder = (page: number) => ProjectURL;

export interface IPaginationInternalProps extends BlockProps<"div"> {
  pagination: IPagination;
  /**
   * A function which accepts a `page` argument and returns the url for that page.
   */
  urlBuilder: IURLBuilder;
}

/**
 * For use in server-rendered collections. Page buttons are {@link LinkInternal internal links} styled as link buttons.
 */
export const PaginationInternal = blockComponent(styles.block, Component);

function Component({
  pagination,
  urlBuilder,
  ...blockProps
}: IPaginationInternalProps) {
  const { t } = useTranslation("components");
  const { totalPages, currentPage, limit, totalCount } = pagination;
  const currentSelectionMin = (currentPage - 1) * limit;
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
          {currentPage === 1 ? (
            1
          ) : (
            <LinkButton href={urlBuilder(1)}>1</LinkButton>
          )}
        </Page>

        <Page>
          {currentPage === 1 || currentPage - 1 === 1 ? (
            "..."
          ) : (
            <LinkButton href={urlBuilder(currentPage - 1)}>
              {currentPage - 1}
            </LinkButton>
          )}
        </Page>

        <Page>{currentPage}</Page>

        <Page>
          {currentPage === totalPages || currentPage + 1 === totalPages ? (
            "..."
          ) : (
            <LinkButton href={urlBuilder(currentPage + 1)}>
              {currentPage + 1}
            </LinkButton>
          )}
        </Page>

        <Page>
          {currentPage === totalPages ? (
            totalPages
          ) : (
            <LinkButton href={urlBuilder(totalPages)}>{totalPages}</LinkButton>
          )}
        </Page>
      </List>
    </div>
  );
}

function Page({ children = undefined }: { children?: any }) {
  return <ListItem className={styles.page}>{children}</ListItem>;
}
