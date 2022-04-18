import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createComment,
  deleteComment,
  fetchComments,
  approveComment,
} from "#lib/api/public";

import type { ICommentClient, ICommentInit } from "#types/entities";
import type { AppState, AppThunk, Status } from "#store/redux";

interface CommentsState {
  currentBlog?: string;
  status: Status;
  blogComments: ICommentClient[];
  comments: ICommentClient[];
}

const reducerName = "comments";

const initialState: CommentsState = {
  currentBlog: undefined,
  status: "idle",
  blogComments: [],
  comments: [],
};

export const getCommentsAsync = createAsyncThunk(
  `${reducerName}/getComments`,
  async () => {
    const response = await fetchComments();
    return response;
  }
);

export const addCommentAsync = createAsyncThunk(
  `${reducerName}/addComment`,
  async (commentInit: ICommentInit) => {
    const response = await createComment(commentInit);
    return response;
  }
);

export const approveCommentAsync = createAsyncThunk(
  `${reducerName}/approveComment`,
  async (commentID: number) => {
    const response = await approveComment(commentID);
    return response;
  }
);

export const deleteCommentAsync = createAsyncThunk(
  `${reducerName}/removeComment`,
  async (commentID: number) => {
    const response = await deleteComment(commentID);
    return response;
  }
);

export const commentsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCommentsAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        const comments = action.payload.data;
        state.comments = comments;

        state.status = "idle";
      })
      .addCase(addCommentAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCommentAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        const newComment = action.payload.data;
        state.blogComments.push(newComment);

        state.status = "idle";
      })
      .addCase(approveCommentAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(approveCommentAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(approveCommentAsync.fulfilled, (state, action) => {
        const approvedComment = action.payload.data;
        state.comments = state.comments.filter(
          ({ id }) => id !== approvedComment.id
        );

        state.status = "idle";
      })
      .addCase(deleteCommentAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCommentAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        const { id: commentID } = action.payload.data;
        const newComments = state.blogComments.filter(
          ({ id }) => id !== commentID
        );

        state.blogComments = newComments;
      });
  },
});

// export const {} = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;

export function selectComments() {
  return (state: AppState) => {
    return state.comments.blogComments;
  };
}
