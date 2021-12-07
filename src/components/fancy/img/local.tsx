import Image from "next/image";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";
import { blockComponent } from "#components";

interface Props extends BlockProps<"span"> {
  src: string;
  srcset?: string;
  alt?: string;
}

export const LocalPicture = blockComponent<Props>(
  styles.block,
  ({ src, alt = "", className, ...blockProps }) => {
    return (
      <span {...blockProps}>
        <picture>
          <Image src={src} alt={alt} />
        </picture>
      </span>
    );
  }
);
