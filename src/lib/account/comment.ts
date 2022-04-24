import {
  addComment,
  removeComment,
  getAllPublicComments,
} from "#database/queries/comments";
import {
  approveComment as approveCommentQuery,
} from "#database/queries/account/admin";
import { AuthError, NotImplementedError } from "#lib/errors";

import type { ICommentInit, IComment, IAccount } from "#types/entities";

export async function getComments() {
  const comments = await getAllPublicComments();

  return comments;
}

export async function getBlogComments(blog_slug: string) {
  throw new NotImplementedError("Not implemented")
  const comments: IComment[] = [];
  return comments;
}

export async function getAccountComments(accountID: number) {
  throw new NotImplementedError("Not implemented")
  const comments: IComment[] = [];
  return comments;
}

export async function createComment(
  accountID: number,
  commentInit: ICommentInit
): Promise<IComment> {
  const newComment = await addComment(accountID, commentInit);

  return newComment;
}

export async function approveComment(
  account: IAccount,
  commentID: number
): Promise<IComment> {
  if (account.role !== "administrator") {
    throw new AuthError(`Account "${account.id}" is not administrator.`);
  }

  const approvedComment = await approveCommentQuery(commentID);

  return approvedComment;
}

export async function deleteComment(
  accountID: number,
  commentID: number
): Promise<IComment> {
  const deletedComment = removeComment(accountID, commentID);

  return deletedComment;
}
