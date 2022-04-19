import { validateCommentInitFields } from "#codegen/schema/validations";
import { FieldsValidationError } from "#lib/errors";
import { useAppDispatch } from "#store/redux";
import { addCommentAsync } from "#store/redux/reducers";
import { blockComponent } from "#components/meta";
import { Form } from "#components/forms";
import { TextArea, Hidden } from "#components/forms/sections";
import { Heading, HeadingLevel } from "#components/headings";
import styles from "./new-comment.module.scss";

import type { ICommentInit, ISerialInteger } from "#types/entities";
import type {
  IFormProps,
  ISubmitEvent,
  IFormElements,
} from "#components/forms";

export interface INewCommentFormProps extends IFormProps {
  headingLevel?: HeadingLevel;
  parentID?: ISerialInteger | null;
}

export const NewCommentForm = blockComponent(styles.block, Component);

function Component({ parentID, headingLevel }: INewCommentFormProps) {
  const dispatch = useAppDispatch();

  async function handleCommentCreation(event: ISubmitEvent) {
    event.preventDefault();
    const formFields = ["content"] as const;

    const form = event.currentTarget;
    const elements = form.elements as IFormElements<typeof formFields[number]>;
    const contentEleem = elements["content"];
    const commentInit: ICommentInit = {
      content: contentEleem.value,
    };

    await validateCommentInitFields<ICommentInit>(commentInit);

    try {
      dispatch(addCommentAsync(commentInit));
      contentEleem.value = "";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form submitButton="Post" onSubmit={handleCommentCreation}>
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
    </Form>
  );
}
