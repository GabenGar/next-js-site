import { useClassName } from "#lib/hooks";
import { Button } from "#components/fancy";
import { Form, FormSection, SubmitButton } from "#components/fancy/form";
import { NumberInput } from "#components/fancy/input";
import { Action, State, gotoPage, selectPage } from "./reducer";
import styles from "./_index.module.scss";

import type { FormEvent, CSSProperties, Dispatch, SetStateAction } from "react";
import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLFormElement> {
  state: State;
  dispatch: Dispatch<Action>;
  changeCurrentPage: Dispatch<SetStateAction<number>>;
}

export function CurrentPage({
  state,
  dispatch,
  changeCurrentPage,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.page, styles.currentPage, className);

  function switchPage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(gotoPage(state.currentSelection));
    changeCurrentPage(state.currentSelection);
  }

  return (
    <Form
      className={blockClass}
      {...blockProps}
      onSubmit={switchPage}
      style={
        {
          "--local-max-width": `${state.totalCount.toString.length}em`,
        } as CSSProperties
      }
    >
      <FormSection>
        <NumberInput
          className={styles.number}
          min={1}
          max={state.totalPages}
          step={1}
          value={state.currentSelection}
          //pleasing error handler
          onChange={() => {
            /**/
          }}
        />
      </FormSection>
      <FormSection
        className={styles.minus}
        onClick={() => {
          dispatch(selectPage(state.currentSelection - 1));
        }}
      >
        <Button>-1</Button>
      </FormSection>
      <FormSection
        className={styles.plus}
        onClick={() => {
          dispatch(selectPage(state.currentSelection + 1));
        }}
      >
        <Button>+1</Button>
      </FormSection>
      <FormSection className={styles.submit}>
        <SubmitButton>Go!</SubmitButton>
      </FormSection>
    </Form>
  );
}
