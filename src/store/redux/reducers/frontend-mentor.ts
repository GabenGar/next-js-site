import { faker } from "@faker-js/faker";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nowISO } from "#lib/dates";
import { fetchComments } from "#lib/api/public";
import { StoreError } from "#lib/errors";
import { validateFMCommentFields } from "#codegen/schema/validations";

import type {
  ICommentClient,
  ICommentInit,
  ISerialInteger,
} from "#types/entities";
import type { IFMComment } from "#types/frontend-mentor";
import type { AppState, AppThunk, Status } from "#store/redux";

interface IFMCommentInfo {
  isVisible: boolean;
  isLiked: boolean;
  isDisliked: boolean;
  isOwn: boolean;
  rating?: "positive" | "negative";
}

interface FrontendMentorState {
  status: Status;
  error?: Error;
  comments: IFMComment[];
  hiddenComments: ISerialInteger[];
  likedComments: ISerialInteger[];
  dislikedComments: ISerialInteger[];
  ownComments: ISerialInteger[];
}

const reducerName = "frontend-mentor";

const initialState: FrontendMentorState = {
  status: "idle",
  error: undefined,
  comments: [],
  hiddenComments: [],
  likedComments: [],
  dislikedComments: [],
  ownComments: [],
};

export const getFMCommentsAsync = createAsyncThunk(
  `${reducerName}/getFMComments`,
  async () => {
    const response = await fetchComments();

    const fmComments: IFMComment[] = [];

    for await (const comment of response.data) {
      const fmComment = await transformComment(comment);

      fmComments.push(fmComment);
    }

    return fmComments;
  }
);

const commentsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    createFMComment: (state, action: PayloadAction<ICommentInit>) => {
      const { content, parent_id } = action.payload;
      const idList = state.comments.map(({ id }) => id);
      const currentMaxID = idList.length ? Math.max(...idList) : 1;
      const fmComment: IFMComment = {
        content,
        parent_id,
        created_at: nowISO(),
        avatar_url: faker.image.avatar(),
        likes: 1,
        dislikes: 0,
        name: faker.name.findName(),
        id: currentMaxID + 1,
      };

      state.ownComments.push(fmComment.id);
      state.likedComments.push(fmComment.id);
      state.comments.push(fmComment);
    },
    updateFMComment: (
      state,
      action: PayloadAction<Pick<IFMComment, "id" | "content">>
    ) => {
      const { id: commentID, content } = action.payload;

      if (!state.ownComments.includes(commentID)) {
        throw new StoreError(
          "redux",
          `Can only edit your own comments and the comment with id "${commentID}" is not yours.`
        );
      }

      const oldComment = state.comments.find(({ id }) => id === commentID);

      if (!oldComment) {
        throw new StoreError(
          "redux",
          `Comment with id "${commentID}" doesn't exist.`
        );
      }

      const commentIndex = state.comments.indexOf(oldComment);
      const finalComment = {
        ...oldComment,
        content,
      };

      state.comments.splice(commentIndex, 1, finalComment);
    },
    deleteFMComment: (state, action: PayloadAction<ISerialInteger>) => {
      const commentID = action.payload;

      if (!state.ownComments.includes(commentID)) {
        throw new StoreError(
          "redux",
          `Can only delete your own comments and the comment with id "${commentID}" is not yours.`
        );
      }

      state.ownComments = state.ownComments.filter((id) => id !== commentID);
      state.comments = state.comments.filter(({ id }) => id !== commentID);
    },
    hideFMComment: (state, action: PayloadAction<ISerialInteger>) => {
      const commentID = action.payload;

      if (state.ownComments.includes(commentID)) {
        throw new StoreError(
          "redux",
          `Can't hide the comment with id "${commentID}" because it's yours.`
        );
      }

      if (state.hiddenComments.includes(commentID)) {
        return;
      }

      state.hiddenComments.push(commentID);
    },
    unhideFMComment: (state, action: PayloadAction<ISerialInteger>) => {
      const commentID = action.payload;
      if (!state.hiddenComments.includes(commentID)) {
        return;
      }

      state.hiddenComments = state.hiddenComments.filter(
        (hiddenID) => hiddenID !== commentID
      );
    },
    likeFMComment: (state, action: PayloadAction<ISerialInteger>) => {
      const commentID = action.payload;

      if (state.ownComments.includes(commentID)) {
        throw new StoreError("redux", "Can't like your own comments.");
      }

      const comment = state.comments.find(({ id }) => id === commentID);

      if (!comment) {
        throw new StoreError("redux", "No comment found while liking.");
      }

      // remove a dislike first
      if (state.dislikedComments.includes(commentID)) {
        state.dislikedComments = state.dislikedComments.filter(
          (dislikedID) => dislikedID !== commentID
        );

        comment.dislikes = comment.dislikes - 1;
      }

      if (state.likedComments.includes(commentID)) {
        return;
      }

      state.likedComments.push(commentID);

      comment.likes = comment.likes + 1;
    },
    dislikeFMComment: (state, action: PayloadAction<ISerialInteger>) => {
      const commentID = action.payload;

      if (state.ownComments.includes(commentID)) {
        throw new StoreError("redux", "Can't dislike your own comments.");
      }

      const comment = state.comments.find(({ id }) => id === commentID);

      if (!comment) {
        throw new StoreError("redux", "No comment found while disliking.");
      }

      // remove a like first
      if (state.likedComments.includes(commentID)) {
        state.likedComments = state.dislikedComments.filter(
          (dislikedID) => dislikedID !== commentID
        );

        comment.likes = comment.likes - 1;
      }

      if (state.dislikedComments.includes(commentID)) {
        return;
      }

      state.dislikedComments.push(commentID);

      comment.dislikes = comment.dislikes + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFMCommentsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFMCommentsAsync.rejected, (state, action) => {
        // @ts-expect-error
        state.error = action.error;
        state.status = "failed";
      })
      .addCase(getFMCommentsAsync.fulfilled, (state, action) => {
        const comments = action.payload;
        state.comments = comments;

        state.status = "idle";
      });
  },
});

export const {
  createFMComment,
  hideFMComment,
  unhideFMComment,
  likeFMComment,
  dislikeFMComment,
  deleteFMComment,
  updateFMComment,
} = commentsSlice.actions;
export const frontendMentorReducer = commentsSlice.reducer;

export function selectFMSlice(state: AppState) {
  return state.frontendMentor;
}

export function selectFMCommentInfo(commentID: ISerialInteger) {
  return (state: AppState): IFMCommentInfo => {
    const {
      comments,
      dislikedComments,
      hiddenComments,
      likedComments,
      ownComments,
    } = selectFMSlice(state);

    const selectedComment = comments.find(({ id }) => id === commentID);

    if (!selectedComment) {
      throw new StoreError(
        "redux",
        `No FM comment in the store with the id of ${commentID}`
      );
    }
    const { likes, dislikes } = selectedComment;

    const isVisible = !hiddenComments.includes(commentID);
    const isLiked = likedComments.includes(commentID);
    const isDisliked = dislikedComments.includes(commentID);
    const isOwn = ownComments.includes(commentID);
    const ratingValue = likes - dislikes;
    let rating: IFMCommentInfo["rating"];

    if (ratingValue > 0) {
      rating = "positive";
    }

    if (ratingValue < 0) {
      rating = "negative";
    }

    const commentInfo = {
      isVisible,
      isLiked,
      isDisliked,
      isOwn,
      rating,
    };

    return commentInfo;
  };
}

/**
 * Transforms {@link ICommentClient client comment} into a comment usable for Frontend Mentor Challenge.
 */
export async function transformComment(
  comment: ICommentClient
): Promise<IFMComment> {
  const { id, content, created_at, parent_id, is_public } = comment;
  const fmComment: IFMComment = {
    name: faker.name.findName(),
    id,
    content,
    created_at,
    parent_id,
    likes: faker.datatype.number({ min: 1 }),
    dislikes: faker.datatype.number({ min: 0 }),
    avatar_url: faker.image.avatar(),
  };

  await validateFMCommentFields(fmComment);

  return fmComment;
}
