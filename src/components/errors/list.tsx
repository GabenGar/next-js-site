import { blockComponent } from "#components/meta";
import { HTMLUl } from "#components/html/ul";
import { HTMLLi } from "#components/html/li";
import { JSONView } from "#components/json";
import styles from "./_index.module.scss";

import type { HTMLUlProps } from "#components/html/ul";
import type { ISchemaValidationError } from "#types/pages";

export interface ErrorListProps extends HTMLUlProps {
  errors: Array<string | ISchemaValidationError>;
}

export const ErrorList = blockComponent<ErrorListProps>(
  styles.list,
  ({ errors, ...blockProps }) => {
    return (
      <HTMLUl {...blockProps}>
        {errors.map((error, index) => {
          return typeof error === "object" ? (
            <HTMLLi key={index}>
              <JSONView json={{ error }} />
            </HTMLLi>
          ) : (
            <HTMLLi key={index + error}>{error}</HTMLLi>
          );
        })}
      </HTMLUl>
    );
  }
);
