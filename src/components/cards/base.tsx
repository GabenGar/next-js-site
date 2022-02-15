import { blockComponent } from "#components/meta";
import styles from "./base.module.scss";

import type { BlockProps } from "#types/props";

const headingLevels = [1, 2, 3, 4, 5, 6] as const;
export type HeadingLevel = typeof headingLevels[number]

export interface ICardProps extends BlockProps<"article"> {
  headingLevel?: HeadingLevel;
}
interface HeaderProps extends BlockProps<"header"> {}
interface BodyProps extends BlockProps<"section"> {}
interface FooterProps extends BlockProps<"footer"> {}

export const Card = blockComponent(
  styles.block,
  ({ children, ...blockProps }: ICardProps) => {
    return <article {...blockProps}>{children}</article>;
  }
);

export const CardHeader = blockComponent(
  styles.header,
  ({ children, ...blockProps }: HeaderProps) => {
    return <header {...blockProps}>{children}</header>;
  }
);

export const CardBody = blockComponent(
  styles.body,
  ({ children, ...blockProps }: BodyProps) => {
    return <section {...blockProps}>{children}</section>;
  }
);

export const CardFooter = blockComponent(
  styles.footer,
  ({ children, ...blockProps }: FooterProps) => {
    return <footer {...blockProps}>{children}</footer>;
  }
);
