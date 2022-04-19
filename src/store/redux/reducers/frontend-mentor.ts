import { faker } from "@faker-js/faker";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchComments } from "#lib/api/public";
import type { ICommentClient, ICommentInit } from "#types/entities";
import type { IFMComment } from "#types/frontend-mentor";
import type { AppState, AppThunk, Status } from "#store/redux";

interface FrontendMentorState {
  status: Status;
  comments: IFMComment[];
}

const reducerName = "frontend-mentor";

const initialState: FrontendMentorState = {
  status: "idle",
  comments: [],
};

export const getFMCommentsAsync = createAsyncThunk(
  `${reducerName}/getFMComments`,
  async () => {
    const response = await fetchComments();
    return response;
  }
);

const commentsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFMCommentsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFMCommentsAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getFMCommentsAsync.fulfilled, (state, action) => {
        const comments = action.payload.data;
        state.comments = comments;

        state.status = "idle";
      });
  },
});

// export const {} = commentsSlice.actions;
export const frontendMentorReducer = commentsSlice.reducer;

export function selectFMComments() {
  return (state: AppState) => {
    return state.frontendMentor.comments;
  };
}

function transformComment(comment: ICommentClient): IFMComment {
  const { id, content, created_at, parent_id } = comment;
  const fmComment: IFMComment = {
    id,
    content,
    created_at,
    parent_id,
    likes: 1,
    dislikes: 0,
  };
  return fmComment;
}
