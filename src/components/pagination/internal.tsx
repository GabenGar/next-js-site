import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { ProjectURL } from "#lib/url";
import { blockComponent } from "#components/meta";
import { List, ListItem } from "#components/lists";
import { LinkButton } from "#components/links";
import { Form } from "#components/forms";
import { Number } from "#components/forms/sections";
import { Button, ButtonSubmit } from "#components/buttons";
import styles from "./internal.module.scss";

import type { CSSProperties } from "react";
import type { IPagination } from "#lib/pagination";
import type { BlockProps } from "#types/props";

interface IPaginationClient extends IPagination {
  baseURL: string;
  currentMin: number;
  currentMax: number;
}

type IURLBuilder = (page: number) => ProjectURL;

export interface IPaginationInternalProps extends BlockProps<"div"> {
  pagination: IPagination;
  /**
   * Base unpaged URL string to run vanilla form query against.
   */
  baseURL: string;
  /**
   * A function which accepts a `page` argument and returns the url for that page.
   */
  urlBuilder: IURLBuilder;
}

/**
 * For use in server-rendered collections. Page buttons are {@link LinkInternal internal links} styled as link buttons.
 *
 * @TODO fix locale redirect
 */
export const PaginationInternal = blockComponent(styles.block, Component);

function Component({
  pagination,
  baseURL,
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
        {t("pagination_overview", {
          min: currentSelectionMin,
          max: currentSelectionMax,
          total: totalCount,
        })}
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

        <CurrentPage pagination={pagination} baseURL={baseURL} />

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

function CurrentPage({
  pagination,
  baseURL,
}: {
  pagination: IPagination;
  baseURL: string;
}) {
  const { currentPage, totalPages } = pagination;
  const [inputWidth, changeInputWidth] = useState(String(currentPage).length);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Page className={styles.current}>
      {totalPages === 1 ? (
        totalPages
      ) : (
        <Form
          id="pagination"
          className={styles.selector}
          method="GET"
          action={baseURL}
          submitButton={
            <ButtonSubmit className={styles.select}>Go</ButtonSubmit>
          }
        >
          <Number
            // a hack to force input update
            key={currentPage}
            id="pagination-current"
            className={styles.selected}
            name="page"
            defaultValue={currentPage}
            minValue={1}
            maxValue={totalPages}
            valueStep={1}
            inputRef={inputRef}
            style={
              { "--local-input-width": `${inputWidth}em` } as CSSProperties
            }
          />
          <Button
            className={styles.decrement}
            onClick={() => {
              inputRef.current?.stepDown();
            }}
          >
            -1
          </Button>
          <Button
            className={styles.increment}
            onClick={() => {
              inputRef.current?.stepUp();
            }}
          >
            +1
          </Button>
        </Form>
      )}
    </Page>
  );
}

function Page({
  children = undefined,
  className,
}: {
  children?: any;
  className?: string;
}) {
  return (
    <ListItem className={clsx(styles.page, className)}>{children}</ListItem>
  );
}
