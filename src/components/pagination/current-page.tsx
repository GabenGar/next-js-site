import { useState } from "react";
import { useClassName } from "#lib/hooks";
import { Form, SubmitButton } from "#components/fancy/form";
import { NumberInput } from "#components/fancy/input";
import styles from "./_index.module.scss";

import type { FormEvent } from "react";
import type { ElementProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ElementProps<HTMLFormElement> {
  currentPage: number;
}

export function CurrentPage({ currentPage, className, ...blockProps }: Props) {
  const [selectedPage, changeSelectedPage] = useState(currentPage);
  const blockClass = useClassName(styles.page, styles.currentPage, className);

  function switchPage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handlePageSelect(event: Event) {
    event.preventDefault();
  }

  return (
    <Form className={blockClass} {...blockProps} onSubmit={switchPage}>
      <NumberInput
        className={styles.number}
        defaultValue={currentPage}
        value={selectedPage}
      />
      <SubmitButton className={styles.submit}>Go!</SubmitButton>
    </Form>
  );
}
