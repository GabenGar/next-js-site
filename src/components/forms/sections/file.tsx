import { blockComponent } from "#components/meta";
import { HTMLInput } from "#components/html/input";
import { FormSection } from "./base";
import styles from "./file.module.scss";

import type { FormSectionProps } from "./base";

export interface IFileProps extends FormSectionProps {
  id?: string;
  name: string;
  required?: boolean;
  accept?: string;
}

export const File = blockComponent(styles.block, Component);

function Component({
  id,
  name,
  accept,
  defaultValue,
  required,
  ...blockProps
}: IFileProps) {
  return (
    <FormSection {...blockProps}>
      <HTMLInput
        id={id}
        name={name}
        type="file"
        accept={accept}
        required={required}
        defaultValue={defaultValue}
      />
    </FormSection>
  );
}
