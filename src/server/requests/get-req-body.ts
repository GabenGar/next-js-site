import contentType from "content-type";
import getRawBody from "raw-body";
import { NotImplementedError } from "#lib/errors";

import type { GetServerSidePropsContext } from "next";
import type { RawBodyError } from "raw-body";

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
 */
export async function getMultipartReqBody<T = Record<string, unknown>>(
  req: GetServerSidePropsContext["req"],
  limit: string = "1mb"
) {
  const body = await getRawBody(req, {
    length: req.headers["content-length"],
    limit: limit,
  });
  console.log(body);

  throw new NotImplementedError("Multipart body parsing");

  const result = {} as T;
  return result
}
