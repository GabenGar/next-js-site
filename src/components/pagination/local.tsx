import { useReducer } from "react";
import { paginationReducer, initState, gotoPage } from "./reducer";
import { CurrentPage } from "./current-page";
import { PageButton } from "./page";
import styles from "./_index.module.scss";

import type {
  MouseEvent as ReactMouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import type { BlockProps } from "#types/base-props";
import { blockComponent } from "#components/meta";

interface Props extends BlockProps<"div"> {
  currentPage: number;
  totalCount: number;
  limit?: number;
  changeCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = blockComponent<Props>(
  styles.block,
  ({
    currentPage = 1,
    totalCount,
    limit = 25,
    changeCurrentPage,
    ...blockProps
  }) => {
    const [state, dispatch] = useReducer(
      paginationReducer,
      {
        currentPage,
        limit,
        totalCount,
      },
      initState
    );

    function switchPage(event: ReactMouseEvent<HTMLDivElement, MouseEvent>) {
      event.stopPropagation();
      const button = event.target as HTMLButtonElement;
      if (
        button.classList.contains(styles.page) &&
        !button.classList.contains(styles.currentPage) &&
        !button.disabled
      ) {
        const pageNumber = Number(button.value);
        dispatch(gotoPage(pageNumber));
        changeCurrentPage(pageNumber);
      }
    }

    return (
      <div {...blockProps}>
        <p className={styles.info}>
          Showing{" "}
          <span className={styles.currentMin}>{state.currentCountMin}</span> -{" "}
          <span className={styles.currentMax}>{state.currentCountMax}</span> out
          of <span className={styles.totalCount}>{state.totalCount}</span>
        </p>

        <div className={styles.buttons} onClick={switchPage}>
          <PageButton pageNumber={state.currentPage !== 1 ? 1 : undefined} />
          <PageButton
            pageNumber={
              state.currentPage - 1 <= 1 ? undefined : state.currentPage - 1
            }
          />
          <CurrentPage
            changeCurrentPage={changeCurrentPage}
            state={state}
            dispatch={dispatch}
          />
          <PageButton
            pageNumber={
              state.currentPage + 1 >= state.totalPages
                ? undefined
                : state.currentPage + 1
            }
          ></PageButton>
          <PageButton
            pageNumber={
              state.totalPages !== state.currentPage
                ? state.totalPages
                : undefined
            }
          />
        </div>
      </div>
    );
  }
)
