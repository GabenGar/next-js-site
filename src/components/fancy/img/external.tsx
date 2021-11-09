import { useEffect, useState } from "react";
import { useClassName } from "#lib/hooks";
import { Picture } from "./picture";
import { IMG } from "./base";
import styles from "./_index.module.scss";

import { SyntheticEvent } from "react";
import type { SpanProps } from "#types";

interface Props extends SpanProps {
  src: string;
  srcSet?: string;
  alt?: string;
  isLazy?: boolean;
}

const STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
};

/**
 * TODO: Write error and load handlers.
 */
export function FancyImageExternal({
  src,
  alt = "",
  srcSet = src,
  isLazy = true,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.block, className);

  const [status, changeStatus] = useState(STATUS.PENDING);

  function handleLoadFinish(event: SyntheticEvent<HTMLImageElement, Event>) {
    changeStatus(STATUS.SUCCESS);
  }

  function handleError(error: SyntheticEvent<HTMLImageElement, Event>) {
    changeStatus(STATUS.ERROR);
  }

  useEffect(() => {
    if (status === STATUS.ERROR) {}
    if (status === STATUS.SUCCESS) {}
  });

  return (
    <span className={blockClass} {...blockProps}>
      <Picture>
        <IMG
          src={src}
          alt={alt}
          srcSet={srcSet}
          loading={isLazy ? "lazy" : "eager"}
          onLoad={handleLoadFinish}
          onError={handleError}
        />
      </Picture>
    </span>
  );
}
