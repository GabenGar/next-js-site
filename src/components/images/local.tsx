import Image from "next/image";
import { blockComponent } from "#components/meta";
import styles from "./local.module.scss";

import type { ImageProps,  ImageLoader } from "next/image";

export interface IImageLocalProps extends ImageProps {}

/**
 * The component for local images.
 */
export const ImageLocal = blockComponent<IImageLocalProps>(
  styles.block,
  ({ src, alt = "", ...blockProps }) => {
    return <Image src={src} alt={alt} {...blockProps} />;
  }
);
