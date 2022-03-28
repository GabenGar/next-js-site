import { blockComponent } from "#components/meta";
import { LocalPicture } from "#components/fancy";
import { LinkInternal } from "#components/links";
import styles from "./_index.module.scss";

import type { ILinkInternalProps } from "#components/links";

interface Props extends ILinkInternalProps {
  src: string;
}

export const LocalImageLink = blockComponent<Props>(
  styles.block,
  ({ href, src, ...blockProps }) => {
    return (
      <LinkInternal href={href} {...blockProps}>
        <LocalPicture className={styles.picture} src={src} />
      </LinkInternal>
    );
  }
);
