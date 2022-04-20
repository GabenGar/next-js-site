import { faker } from "@faker-js/faker";
import { useState } from "react";
import { validateCommentInitFields } from "#codegen/schema/validations";
import { FieldsValidationError } from "#lib/errors";
import { useAppDispatch } from "#store/redux";
import { createFMComment } from "#store/redux/reducers";
import { blockComponent } from "#components/meta";
import { JSONView } from "#components/json";
import { Button, ButtonList, ButtonSubmit } from "#components/buttons";
import { Form } from "#components/forms";
import { TextArea, Hidden } from "#components/forms/sections";
import { Heading, HeadingLevel } from "#components/headings";
import { FMCommentCard } from "./comment-card";
import styles from "./new-comment.module.scss";

import type { ICommentInit, ISerialInteger } from "#types/entities";
import type { IFMComment } from "#types/frontend-mentor";
import type {
  IFormProps,
  ISubmitEvent,
  IFormElements,
} from "#components/forms";
import { nowISO } from "#lib/dates";
import clsx from "clsx";

export interface INewCommentFormProps extends IFormProps {
  headingLevel?: HeadingLevel;
  parentID?: ISerialInteger | null;
  /**
   * Calls this callbak on closing.
   */
  onClosing?: () => void;
}

export const NewCommentForm = blockComponent(styles.block, Component);

function Component({
  className,
  parentID,
  headingLevel,
  onClosing,
}: INewCommentFormProps) {
  const dispatch = useAppDispatch();
  const [errors, updateErrors] = useState([]);
  // @TODO: actual preview
  const [isPreview, switchPreview] = useState(false);
  const formClass = clsx(className, parentID && styles.block_reply);

  async function handleCommentCreation(event: ISubmitEvent) {
    event.preventDefault();
    const formFields = ["content"] as const;

    const form = event.currentTarget;
    const elements = form.elements as IFormElements<typeof formFields[number]>;
    const contentEleem = elements["content"];
    const commentInit: ICommentInit = {
      content: contentEleem.value,
    };

    try {
      await validateCommentInitFields<ICommentInit>(commentInit);
    } catch (error) {
      if (error instanceof FieldsValidationError) {
        updateErrors(error.validationErrors as any);
      }
      return;
    }

    dispatch(createFMComment(commentInit));
    contentEleem.value = "";
    onClosing && onClosing();
  }

  return (
    <Form
      className={formClass}
      submitButton={
        <ButtonList
          className={clsx(styles.buttons, isPreview && styles.buttons_preview)}
        >
          <Button
            className={styles.confirm}
            onClick={() => {
              switchPreview(true);
            }}
          >
            Post
          </Button>
          <span className={styles.preview}>Are you sure?</span>
          <Button
            className={styles.preview}
            onClick={() => {
              switchPreview(false);
            }}
          >
            No
          </Button>
          <ButtonSubmit className={styles.preview}>Yes</ButtonSubmit>
        </ButtonList>
      }
      onSubmit={handleCommentCreation}
    >
      {parentID ? (
        <>
          <Heading level={headingLevel}>Reply</Heading>
          <Hidden name="parent_id" defaultValue={parentID} />
        </>
      ) : (
        <Heading level={headingLevel}>Leave a comment</Heading>
      )}
      <TextArea
        id={parentID ? `${parentID}-comment-content` : "comment-content"}
        name="content"
        required
        minLength={5}
        maxLength={1024}
        rows={5}
      >
        Message:
      </TextArea>
      {errors.length ? <JSONView json={errors} /> : undefined}
    </Form>
  );
}
