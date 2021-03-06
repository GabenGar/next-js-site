import { blockComponent } from "#components/meta";
import { Link } from "#components/links";
import { Image } from "#components/images";
import styles from "./image-link.module.scss";

import type { ILinkProps } from "#components/links";
import type { ImageArg } from "./types";

export interface IImageLinkProps extends Omit<ILinkProps, "href"> {
  imageSrc: ImageArg;
  imageAlt?: string;
  linkHref?: string | URL;
  imageHeight?: string;
}

export const ImageLink = blockComponent<IImageLinkProps>(
  styles.block,
  ({ imageSrc, linkHref, imageAlt = "", imageHeight, ...blockProps }) => {
    const href =
      linkHref || (typeof imageSrc === "string" ? imageSrc : imageSrc.src);

    return (
      <Link {...blockProps} target="_blank" href={href}>
        <Image className={styles.image} src={imageSrc} alt={imageAlt} imageHeight={imageHeight} />
      </Link>
    );
  }
);
