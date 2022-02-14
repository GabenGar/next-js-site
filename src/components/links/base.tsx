import { blockComponent } from "#components/meta";
import { guessLinkType } from "#lib/util";
import { LinkExternal } from "./external";
import { LinkInternal } from "./internal";
import { LinkLocal } from "./local";
import { LinkEmail } from "./email";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface ILinkProps extends BlockProps<"a"> {
  url: string | URL;
}

export const Link = blockComponent<ILinkProps>(
  styles.block,
  ({ url, children, ...blockProps }) => {
    const { type, parsedUrl } = guessLinkType(url);

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
