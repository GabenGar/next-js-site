import { useState } from "react";
import { blockComponent } from "#components/meta";
import { HTMLLabel } from "#components/html/label";
import { HTMLInput } from "#components/html/input";
import { Image } from "#components/images";
import { FormSection } from "./base";
import styles from "./file.module.scss";

import type { ChangeEvent } from "react";
import type { FormSectionProps } from "./base";

interface IFileItem extends File {
  src: string;
}

export interface IFileProps extends FormSectionProps {
  id?: string;
  name: string;
  required?: boolean;
  accept?: string;
}

export const FileInput = blockComponent(styles.block, Component);

function Component({
  id,
  name,
  accept,
  defaultValue,
  required,
  children,
  ...blockProps
}: IFileProps) {
  const [selectedFiles, changeSelectedFiles] = useState<IFileItem[]>([]);

  async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;

    if (!fileList) {
      if (selectedFiles.length) {
        selectedFiles.forEach((file) => {
          URL.revokeObjectURL(file.src);
        });
        changeSelectedFiles([]);
      }
      return;
    }

    const files: IFileItem[] = [];

    for await (const file of fileList) {
      const url = URL.createObjectURL(file);
      (file as IFileItem).src = url;

      files.push(file as IFileItem);
    }
  }

  return (
    <FormSection {...blockProps}>
      <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
      <HTMLInput
        id={id}
        name={name}
        type="file"
        accept={accept}
        required={required}
        defaultValue={defaultValue}
        onChange={handleInputChange}
      />
      <div className={styles.previews}>
        {selectedFiles.map((file, index) => (
          <div key={index}>
            <span>{file.name}</span> <span>{file.size}</span>{" "}
            <Image src={file.src}></Image>
          </div>
        ))}
      </div>
    </FormSection>
  );
}
