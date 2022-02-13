import { blockComponent } from "#components/meta";
import { DL, DS, DT, DD } from "#components/lists/d-list";
import styles from "./_index.module.scss";

import type { IDLProps } from "#components/lists/d-list";

export interface ErrorDictProps extends IDLProps {
  errors: Record<string, string[]>;
}

export const ErrorDict = blockComponent<ErrorDictProps>(
  styles.dict,
  ({ errors, ...blockProps }) => {
    return (
      <DL {...blockProps}>
        {Object.entries(errors).map(([key, errors]) => (
          <DS key={key}>
            <DT>{key}</DT>
            {errors.map((error, index) => (
              <DD key={index + error}>{error}</DD>
            ))}
          </DS>
        ))}
      </DL>
    );
  }
);
