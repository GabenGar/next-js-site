import { ProjectError } from "#lib/errors";
import { apiV1Fetch } from "./fetch";
import { createRequestBody } from "./fetch";

import type {
  ICommentInit,
  ICommentClient,
  ISerialInteger,
} from "#types/entities";
import type { APIResponse } from "#types/api";

export async function createComment(commentInit: ICommentInit) {
  const response = await apiV1Fetch("/account/comment/create", {
    method: "POST",
    body: createRequestBody<ICommentInit>(commentInit),
  });
  const result: APIResponse<ICommentClient> = await response.json();

  if (!result.is_successful) {
    throw new ProjectError(String(result));
  }

  return result;
}

export async function deleteComment(commentID: number) {
  const response = await apiV1Fetch("/account/comment/delete", {
    method: "POST",
    body: createRequestBody<ISerialInteger>(commentID),
  });
  const result: APIResponse<ICommentClient> = await response.json();

  if (!result.is_successful) {
    throw new ProjectError(String(result));
  }

  return result;
}

export async function approveComment(commentID: number) {
  const response = await apiV1Fetch("/account/comment/approve", {
    method: "POST",
    body: createRequestBody<ISerialInteger>(commentID),
  });
  const result: APIResponse<ICommentClient> = await response.json();

  if (!result.is_successful) {
    throw new ProjectError(String(result));
  }

  return result;
}
