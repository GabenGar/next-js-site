import { useState } from "react";
import { blockComponent } from "#components/meta";
import { HTMLLabel } from "#components/html/label";
import { HTMLInput } from "#components/html/input";
import { Image } from "#components/images";
import {
  CardList,
  Card,
  CardHeader,
  Heading,
  CardBody,
} from "#components/cards";
import { FormSection } from "./base";
import styles from "./file.module.scss";

import type { ChangeEvent } from "react";
import type { HeadingLevel } from "#components/headings";
import type { FormSectionProps } from "./base";

interface IFileItem extends File {
  src: string;
}

export interface IFileProps extends FormSectionProps {
  id?: string;
  name: string;
  required?: boolean;
  accept?: string;
  headingLevel?: HeadingLevel;
}

export const FileInput = blockComponent(styles.block, Component);

function Component({
  id,
  name,
  accept,
  defaultValue,
  required,
  headingLevel,
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

    changeSelectedFiles(files);
  }

  return (
    <FormSection {...blockProps}>
      <HTMLLabel htmlFor={id}>{children}</HTMLLabel>
      <HTMLLabel htmlFor={id} className={styles.label}>
        Click to select files
      </HTMLLabel>
      <HTMLInput
        id={id}
        className={styles.input}
        name={name}
        type="file"
        accept={accept}
        required={required}
        defaultValue={defaultValue}
        onChange={handleInputChange}
      />
      <CardList className={styles.previews} isLayoutShown={false}>
        {selectedFiles.map((file, index) => (
          <Card key={index} className={styles.preview}>
            {/* <CardHeader>
              <Heading className={styles.name} level={headingLevel}>
                {file.name}
              </Heading>
              <p>{file.size}</p>
            </CardHeader> */}
            <CardBody>
              <Image
                src={file.src}
                imageHeight="20em"
                imageWidth="100%"
              ></Image>
            </CardBody>
          </Card>
        ))}
      </CardList>
    </FormSection>
  );
}
