import { faker } from "@faker-js/faker";
import { useState } from "react";
import { validateCommentInitFields } from "#codegen/schema/validations";
import { FieldsValidationError } from "#lib/errors";
import { useAppDispatch } from "#store/redux";
import { addFMComment } from "#store/redux/reducers";
import { blockComponent } from "#components/meta";
import { JSONView } from "#components/json";
import { ButtonSubmit } from "#components/buttons";
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
  onClosing: () => void;
}

export const NewCommentForm = blockComponent(styles.block, Component);

function Component({
  className,
  parentID,
  headingLevel,
}: INewCommentFormProps) {
  const dispatch = useAppDispatch();
  const [errors, updateErrors] = useState([]);
  const [{ isPreview, comment }, changePreviewMode] = useState<{
    isPreview: boolean;
    comment?: IFMComment;
  }>({ isPreview: false, comment: undefined });
  const formClass = clsx(
    className,
    parentID && styles.block_reply,
    isPreview && styles.block_preview
  );

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

    if (!isPreview) {
      const commentPreview = createCommentPreview(commentInit);
      changePreviewMode({ isPreview: true, comment: commentPreview });

      return;
    }

    dispatch(addFMComment(comment!));
    contentEleem.value = "";
  }

  return (
    <Form
      className={formClass}
      submitButton={
        <ButtonSubmit>{!isPreview ? "Preview" : "Confirm"}</ButtonSubmit>
      }
      onSubmit={handleCommentCreation}
    >
      {parentID ? (
        <Hidden name="parent_id" defaultValue={parentID} />
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
        Content
      </TextArea>
      {errors.length ? (
        <JSONView json={errors} />
      ) : (
        isPreview && (
          <output className={styles.preview}>
            {comment && <FMCommentCard comment={comment} />}
          </output>
        )
      )}
    </Form>
  );
}

function createCommentPreview({
  content,
  parent_id,
}: ICommentInit): IFMComment {
  const fmComment: IFMComment = {
    id: faker.datatype.number(),
    created_at: nowISO(),
    avatar_url: faker.image.avatar(),
    likes: 1,
    dislikes: 0,
    name: faker.name.findName(),
    content,
    parent_id,
  };
  return fmComment;
}
