import { blockComponent } from "#components/meta";
import { HTMLA } from "#components/html/a";
import styles from "./_index.module.scss";

import type { IHTMLAProps } from "#components/html/a";

export interface LinkLocalProps extends Omit<IHTMLAProps, "href"> {
  targetID: string;
}

export const LinkLocal = blockComponent<LinkLocalProps>(
  styles.block,
  ({ targetID, children, ...blockProps }) => {
    return (
      <HTMLA {...blockProps} href={`#${targetID}`}>
        {children}
      </HTMLA>
    );
  }
);
