import contentType from "content-type";
import getRawBody from "raw-body";
import { IncomingForm } from "formidable";
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
  limit: string = "1mb"
) {
  const uploadDir = await getTempFolder();
  const { fields, files } = await parseForm(req, { uploadDir });
  const result = { ...fields, ...files } as unknown as T;

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
