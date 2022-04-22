import clsx from "clsx";
import { useState } from "react";
import { blockComponent } from "#components/meta";
import { ButtonList } from "./list";
import { Button } from "./button";
import { ButtonAccept } from "./accept";
import { ButtonDecline } from "./decline";
import styles from "./confirmation-dialogue.module.scss";

import type { ReactNode } from "react";
import { IButtonListProps } from "#components/buttons";

export interface IConfirmationDialogueProps extends IButtonListProps {
  /**
   * Run this callback when confirmation is denied.
   */
  onDecline: () => void;
  /**
   * Icon ID for the trigger button, if any.
   */
  iconID?: string;
  /**
   * The same behaviour as [`form` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-form) but on the confirmation button.
   */
  formID?: string;
  /**
   * The confirmation message to show.
   */
  message?: ReactNode;
  /**
   * Controles the starting state of the dialogue.
   * Pass `true` for confirmation stage only.
   * @default false
   */
  isDecidingInit?: boolean;
}

/**
 * The final confirmation triggers `onSubmit()`
 * therefore it should be wrapped in the `<form>` element
 * or provided with `formID` props.
 */
export const ConfirmationDialogue = blockComponent(styles.block, Component);

function Component({
  onDecline,
  isDecidingInit = false,
  iconID,
  message,
  formID,
  children,
  className,
  ...blockProps
}: IConfirmationDialogueProps) {
  const [isDeciding, switchDecision] = useState(isDecidingInit);
  const blockClass = clsx(className, isDeciding && styles.block_isDeciding);

  return (
    <ButtonList className={blockClass} {...blockProps}>
      <Button
        className={styles.trigger}
        iconID={iconID}
        onClick={() => {
          switchDecision(true);
        }}
      >
        {children}
      </Button>
      <span className={styles.message}>{message ?? "Are you sure?"}</span>
      <ButtonDecline
        className={styles.decline}
        onClick={() => {
          !isDecidingInit && switchDecision(false);
          onDecline();
        }}
      >
        No
      </ButtonDecline>
      <ButtonAccept
        className={styles.confirm}
        form={formID}
        onClick={() => {
          switchDecision(false);
        }}
      >
        Yes
      </ButtonAccept>
    </ButtonList>
  );
}
