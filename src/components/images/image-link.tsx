import { blockComponent } from "#components/meta";
import { Link } from "#components/links";
import { Image } from "#components/images";
import styles from "./image-link.module.scss";

import type { ILinkProps } from "#components/links";

export interface IImageLinkProps extends Omit<ILinkProps, "url"> {
  imageSrc: string | StaticImageData;
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
      <Link {...blockProps} target="_blank" url={href}>
        <Image className={styles.image} src={imageSrc} alt={imageAlt} imageHeight={imageHeight} />
      </Link>
    );
  }
);
