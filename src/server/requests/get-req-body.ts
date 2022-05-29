import { Writable } from "stream";
import { Buffer } from "buffer";
import contentType from "content-type";
import getRawBody from "raw-body";
import { IncomingForm } from "formidable";
import { REQUEST_PAYLOAD_LIMIT } from "#environment/constants/vercel";

import type { GetServerSidePropsContext } from "next";
import type { RawBodyError } from "raw-body";
import type { Fields, Files, Options } from "formidable";

interface IMultipartResult {
  fields: Fields;
  files: Files;
  content: Buffer;
}

/**
 * For use in default forms.
 */
export async function getReqBody<T = Record<string, unknown>>(
  req: GetServerSidePropsContext["req"],
  limit: string = "1mb"
): Promise<T> {
  const body = await getRawBody(req, {
    length: req.headers["content-length"],
    limit: limit,
    encoding: true,
  });

  const params = new URLSearchParams(body);
  const result = Object.fromEntries(params) as unknown as T;
  return result;
}

/**
 * For parsing file uploads.
 * @TODO size limit
 */
export async function getMultipartReqBody<FormType = Record<string, unknown>>(
  req: GetServerSidePropsContext["req"],

  limit: number = REQUEST_PAYLOAD_LIMIT
) {
  const parsedForm = await parseForm(req, {
    maxTotalFileSize: limit,
  });
  const result = normalizeForm<FormType>(parsedForm);

  return result;
}

function parseForm(
  req: GetServerSidePropsContext["req"],
  options?: Omit<Options, "keepExtensions">
) {
  const result = new Promise<IMultipartResult>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const form = new IncomingForm({
      ...options,
      keepExtensions: true,
      fileWriteStreamHandler: () => fileConsumer<Buffer>(chunks),
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      const content = Buffer.concat(chunks);
      // console.log("BufferContent: ", content);

      resolve({ fields, files, content });
    });
  });

  return result;
}

function fileConsumer<AccumulatorType = unknown>(
  accumulator: AccumulatorType[]
) {
  const writable = new Writable({
    write: (chunk: AccumulatorType, _enc, next) => {
      // console.log("Chunk: ", chunk);

      accumulator.push(chunk);
      next();
    },
  });

  return writable;
}

/**
 * The parsing result from `formidable` returns a dictionary
 * with values as arrays even if there is only a single element.
 * So the values have to be normalized
 */
function normalizeForm<SchemaType>({
  fields,
  files,
  content,
}: IMultipartResult) {
  const normalizedFields = Object.entries(fields).reduce<
    Record<string, unknown>
  >((normalizedFields, [key, value]) => {
    normalizedFields[key] = typeof value === "string" ? value : value[0];

    return normalizedFields;
  }, {});
  const normalizedFiles = Object.entries(files).reduce<Record<string, unknown>>(
    (normalizedFiles, [key, value]) => {
      normalizedFiles[key] = Array.isArray(value) ? value[0] : value;

      return normalizedFiles;
    },
    {}
  );

  const result = {
    ...normalizedFields,
    ...normalizedFiles,
    content,
  } as unknown as SchemaType;

  // console.log(toSerializedObject(result));

  return result;
}
