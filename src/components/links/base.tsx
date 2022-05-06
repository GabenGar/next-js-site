import { guessLinkType } from "#lib/util";
import { blockComponent } from "#components/meta";
import { LinkExternal } from "./external";
import { LinkInternal } from "./internal";
import { LinkLocal } from "./local";
import { LinkEmail } from "./email";
import styles from "./_index.module.scss";

import type { IHTMLAProps } from "#components/html/a";

export interface ILinkProps extends IHTMLAProps {}

export const Link = blockComponent<ILinkProps>(
  styles.block,
  ({ href, children, ...blockProps }) => {
    const { type, parsedUrl } = guessLinkType(href);

    switch (type) {
      case "local": {
        return (
          <LinkLocal targetID={parsedUrl} {...blockProps}>
            {children}
          </LinkLocal>
        );
      }
      case "email": {
        return (
          <LinkEmail email={parsedUrl} {...blockProps}>
            {children}
          </LinkEmail>
        );
      }
      case "internal": {
        const { target, ...finalProps } = blockProps;
        return (
          <LinkInternal {...finalProps} href={parsedUrl} target={target}>
            {children}
          </LinkInternal>
        );
      }
      case "external":
      default: {
        return (
          <LinkExternal {...blockProps} href={parsedUrl}>
            {children}
          </LinkExternal>
        );
      }
    }
  }
);
