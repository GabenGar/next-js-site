import { blockComponent } from "#components/meta";
import { HTMLDiv } from "#components/html/div";
import styles from "./_index.module.scss";
import { ErrorList } from "./list";

import type { HTMLDivProps } from "#components/html/div";
import type { ISchemaValidationError } from "#types/pages";

export interface ErrorViewProps extends HTMLDivProps {
  errors: Array<string | ISchemaValidationError>;
}

export const ErrorsView = blockComponent<ErrorViewProps>(
  styles.block,
  ({ errors, ...blockProps }) => {
    return (
      <HTMLDiv {...blockProps}>
        <ErrorList errors={errors} />
      </HTMLDiv>
    );
  }
);
