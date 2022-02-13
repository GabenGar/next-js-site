import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface IJSONObject {
  [key: string]: IJSONable;
}

export interface IJSONArray extends Array<IJSONable> {}

export type IJSONable =
  | IJSONObject
  | IJSONArray
  | string
  | number
  | null
  | boolean;

export interface IJSONViewProps extends BlockProps<"pre"> {
  json: IJSONable;
}

export const JSONView = blockComponent<IJSONViewProps>(
  styles.block,
  ({ json, ...blockProps }) => {
    return <pre {...blockProps}>{JSON.stringify(json, undefined, 2)}</pre>;
  }
);
