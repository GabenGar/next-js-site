import { Dispatch } from "react";
import { useClassName } from "#lib/hooks";
import { Button } from "#components/fancy";
import { Form, FormSection, SubmitButton } from "#components/fancy/form";
import { NumberInput } from "#components/fancy/input";
import { Action, State, gotoPage, selectPage } from "./reducer";
import styles from "./_index.module.scss";

import type { FormEvent, CSSProperties } from "react";
import type { ElementProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ElementProps<HTMLFormElement> {
  state: State;
  dispatch: Dispatch<Action>;
}

export function CurrentPage({
  state,
  dispatch,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.page, styles.currentPage, className);

  function switchPage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(gotoPage(state.currentSelection));
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
          // strictly to plea error handler
          onChange={()=>{/**/}}
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
