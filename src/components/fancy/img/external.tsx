import { useEffect, useState } from "react";
import { blockComponent } from "#components/meta";
import { Picture } from "./picture";
import { IMG } from "./base";
import styles from "./_index.module.scss";

import type { SyntheticEvent } from "react";
import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"span"> {
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
export const FancyImageExternal = blockComponent<Props>(
  styles.block,
  ({ src, alt = "", srcSet = src, isLazy = true, ...blockProps }) => {
    const [status, changeStatus] = useState(STATUS.PENDING);

    function handleLoadFinish(event: SyntheticEvent<HTMLImageElement, Event>) {
      changeStatus(STATUS.SUCCESS);
    }

    function handleError(error: SyntheticEvent<HTMLImageElement, Event>) {
      changeStatus(STATUS.ERROR);
    }

    useEffect(() => {
      if (status === STATUS.ERROR) {
      }
      if (status === STATUS.SUCCESS) {
      }
    });

    return (
      <span {...blockProps}>
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
);
