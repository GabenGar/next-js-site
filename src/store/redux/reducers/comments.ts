import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createComment, deleteComment } from "#lib/api/public";

import type { ICommentClient, ICommentInit } from "#types/entities";
import type { AppState, AppThunk, Status } from "#store/redux";

export interface CommentsState {
  currentBlog?: string;
  status: Status;
  blogComments: ICommentClient[];
}

const reducerName = "comments";

const initialState: CommentsState = {
  currentBlog: undefined,
  status: "idle",
  blogComments: [],
};

export const addCommentAsync = createAsyncThunk(
  `${reducerName}/addComment`,
  async (commentInit: ICommentInit) => {
    const response = await createComment(commentInit);
    return response;
  }
);

export const deleteCommentAsync = createAsyncThunk(
  `${reducerName}/removeComment`,
  async (noteID: number) => {
    const response = await deleteComment(noteID);
    return response;
  }
);

export const commentsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
