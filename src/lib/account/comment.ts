import { ICommentInit, IComment } from "#types/entities";

export async function getComments(accountID?: number) {
  const comments: IComment[] = [];
  return comments;
}

export async function getBlogComments(blog_slug: string, accountID?: number) {
  const comments: IComment[] = [];
  return comments;
}

export async function getAccountComments(accountID: number) {
  const comments: IComment[] = [];
  return comments;
}

export async function createComment(
  accountID: number,
  commentInit: ICommentInit
): Promise<IComment> {
  const newComment: IComment = {};

  return newComment;
}

export async function approveComment(
  account_id: number,
  comment_id: number
): Promise<IComment> {
  const approvedComment: IComment = {};

  return approvedComment;
}

export async function deleteComment(
  account_id: number,
  comment_id: number
): Promise<IComment> {
  const deletedComment: IComment = {};

  return deletedComment;
}
