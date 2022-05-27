import contentType from "content-type";
import getRawBody from "raw-body";
import { IncomingForm } from "formidable";
import { REQUEST_PAYLOAD_LIMIT } from "#environment/constants/vercel";
import { toJSON } from "#lib/json";
import { NotImplementedError } from "#lib/errors";
import { getTempFolder } from "#server/fs";

import type { GetServerSidePropsContext } from "next";
import type { RawBodyError } from "raw-body";
import type { Fields, Files, Options } from "formidable";

interface MultipartResult {
  fields: Fields;
  files: Files;
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
export async function getMultipartReqBody<T = Record<string, unknown>>(
  req: GetServerSidePropsContext["req"],

  limit: number = REQUEST_PAYLOAD_LIMIT
) {
  const uploadDir = await getTempFolder();
  const { fields, files } = await parseForm(req, {
    uploadDir,
    maxTotalFileSize: limit,
  });
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
  const result = { ...normalizedFields, ...normalizedFiles } as unknown as T;
  // console.log(toJSON(result));

  return result;
}

function parseForm(
  req: GetServerSidePropsContext["req"],
  options?: Omit<Options, "keepExtensions">
) {
  const result = new Promise<MultipartResult>(async (resolve, reject) => {
    const form = new IncomingForm({ ...options, keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      resolve({ fields, files });
    });
  });

  return result;
}
