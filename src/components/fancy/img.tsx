import Image, { ImageProps } from 'next/image'
import { useClassName } from "#lib/hooks";
import styles from "./img.module.scss";

// import type { ElementProps } from "#types";

interface Props extends ImageProps {
}

export function Picture({ className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (<Image className={blockClass} {...blockProps}/>
  );
}
