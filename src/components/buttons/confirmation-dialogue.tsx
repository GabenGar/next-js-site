import { blockComponent } from "#components/meta";
import { ButtonList } from "./list";
import { ButtonAccept } from "./accept";
import { ButtonDecline } from "./decline";
import styles from "./confirmation-dialogue.module.scss";

import type { ReactNode } from "react";
import type { IButtonListProps } from "#components/buttons";

export interface IConfirmationDialogueProps extends IButtonListProps {
  /**
   * The same behaviour as [`form` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-form) but on the confirmation button.
   */
  formID?: string;
  /**
   * Run this callback when confirmation is denied.
   */
  onDecline: () => void;
  /**
   * A message to show asking for confirmation.
   */
  confirmationMessage?: ReactNode;
}

export const ConfirmationDialogue = blockComponent(styles.block, Component);

function Component({
  onDecline,
  confirmationMessage,
  formID,
  children,
  ...blockProps
}: IConfirmationDialogueProps) {
  return (
    <ButtonList {...blockProps}>
      {children}
      {confirmationMessage ? (
        confirmationMessage
      ) : (
        <span className={styles.message}>Are you sure?</span>
      )}
      <ButtonDecline
        className={styles.decline}
        onClick={() => {
          onDecline();
        }}
      >
        No
      </ButtonDecline>
      <ButtonAccept className={styles.confirm} form={formID}>
        Yes
      </ButtonAccept>
    </ButtonList>
  );
}
