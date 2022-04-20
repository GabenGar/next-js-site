import { faker } from "@faker-js/faker";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

  rating?: "positive" | "negative";
}

interface FrontendMentorState {
  status: Status;
  error?: Error;
  comments: IFMComment[];
  hiddenComments: ISerialInteger[];
  likedComments: ISerialInteger[];
  dislikedComments: ISerialInteger[];
}

const reducerName = "frontend-mentor";

const initialState: FrontendMentorState = {
  status: "idle",
  error: undefined,
  comments: [],
  hiddenComments: [],
  likedComments: [],
  dislikedComments: [],
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
    hideFMComment: (state, action: PayloadAction<ISerialInteger>) => {
      const commentID = action.payload;
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
      const comment = state.comments.find(({ id }) => id === commentID);

      if (!comment) {
        throw new StoreError("No comment found while liking.");
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
      const comment = state.comments.find(({ id }) => id === commentID);

      if (!comment) {
        throw new StoreError("No comment found while disliking.");
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
  hideFMComment,
  unhideFMComment,
  likeFMComment,
  dislikeFMComment,
} = commentsSlice.actions;
export const frontendMentorReducer = commentsSlice.reducer;

export function selectFMSlice(state: AppState) {
  return state.frontendMentor;
}

export function selectFMCommentInfo(commentID: ISerialInteger) {
  return (state: AppState): IFMCommentInfo => {
    const { comments, dislikedComments, hiddenComments, likedComments } =
      selectFMSlice(state);

    const selectedComment = comments.find(({ id }) => id === commentID);

    if (!selectedComment) {
      throw new StoreError(
        `No FM comment in the store with the id of ${commentID}`
      );
    }
    const { likes, dislikes } = selectedComment;

    const isVisible = !hiddenComments.includes(commentID);
    const isLiked = likedComments.includes(commentID);
    const isDisliked = dislikedComments.includes(commentID);
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
      rating,
    };

    return commentInfo;
  };
}

async function transformComment(comment: ICommentClient): Promise<IFMComment> {
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
