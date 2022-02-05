import { blockComponent } from "#components/meta";
import { HTMLA } from "#components/html/a";
import { SVGIcon } from "#components/icons";
import styles from "./_index.module.scss";

import type { HTMLAProps } from "#components/html/a";

export interface IEmailFields {
  cc?: string;
  bcc?: string;
  subject?: string;
  body?: string;
}

export interface ILinkEmailProps extends HTMLAProps {
  email: string;
  emailFields?: IEmailFields;
}

export const LinkEmail = blockComponent<ILinkEmailProps>(
  styles.email,
  ({ email, emailFields, children, ...blockProps }) => {
    const emailURL = `mailto:${email}`;

    return (
      <HTMLA {...blockProps} href={emailURL}>
        <SVGIcon className={styles.icon} iconID="envelope" />
        {children}
      </HTMLA>
    );
  }
);
