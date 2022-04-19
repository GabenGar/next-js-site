import { faker } from "@faker-js/faker";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchComments } from "#lib/api/public";
import type {
  ICommentClient,
  ICommentInit,
  ISerialInteger,
} from "#types/entities";
import type { IFMComment } from "#types/frontend-mentor";
import type { AppState, AppThunk, Status } from "#store/redux";
import { validateFMCommentFields } from "#codegen/schema/validations";

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
      if (!state.hiddenComments.includes(action.payload)) {
        state.hiddenComments.push(action.payload);
      }
    },
    unhideFMComment: (state, action: PayloadAction<ISerialInteger>) => {
      if (state.hiddenComments.includes(action.payload)) {
        state.hiddenComments = state.hiddenComments.filter(
          (fmComment) => fmComment !== action.payload
        );
      }
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

export const { hideFMComment, unhideFMComment } = commentsSlice.actions;
export const frontendMentorReducer = commentsSlice.reducer;

export function selectFMSlice() {
  return (state: AppState) => {
    return state.frontendMentor;
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
