import { validateCommentInitFields } from "#codegen/schema/validations";
import { FieldsValidationError } from "#lib/errors";
import { useAppDispatch } from "#store/redux";
import { addCommentAsync } from "#store/redux/reducers";
import { blockComponent } from "#components/meta";
import { Form } from "#components/forms";
import { TextArea } from "#components/forms/sections";
import styles from "./new-comment.form.module.scss";

import type { ICommentInit } from "#types/entities";
import type {
  IFormProps,
  ISubmitEvent,
  IFormElements,
} from "#components/forms";

export interface INewCommentFormProps extends IFormProps {}

export const NewCommentForm = blockComponent(styles.block, Component);

function Component({}) {
  const dispatch = useAppDispatch();

  async function handleCommentCreation(event: ISubmitEvent) {
    event.preventDefault();
    const formFields = ["content"] as const;

    const form = event.currentTarget;
    const elements = form.elements as IFormElements<typeof formFields[number]>;
    const content = elements["content"].value;

    const validationResult = await validateCommentInitFields<ICommentInit>({
      content,
    });

    if (!validationResult.is_successful) {
      throw new FieldsValidationError(validationResult.errors);
    }

    const validatedCommentInit = validationResult.data;

    dispatch(addCommentAsync(validatedCommentInit));
  }

  return (
    <Form submitButton="Add" onSubmit={handleCommentCreation}>
      <TextArea
        id="comment-content"
        name="content"
        required
        minLength={5}
        maxLength={1024}
      >
        Content
      </TextArea>
    </Form>
  );
}
