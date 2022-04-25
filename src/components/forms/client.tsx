import { blockComponent, ClientComponent } from "#components/meta";
import { Form } from "./base";
import styles from "./client.module.scss";

import type { FormEventHandler } from "react";
import type { IFormProps, ISubmitEvent } from "./base";

export interface IFormClientProps extends IFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

/**
 * The form for use by the client-only code.
 * Is not rendered on server.
 * `onSubmit` is prevented by default and is a required prop.
 */
export const FormClient = blockComponent(styles.block, Component);

function Component({ onSubmit, children, ...blockProps }: IFormClientProps) {
  function handleSubmit(event: ISubmitEvent) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <ClientComponent>
      <Form {...blockProps} onSubmit={handleSubmit}>
        {children}
      </Form>
    </ClientComponent>
  );
}
