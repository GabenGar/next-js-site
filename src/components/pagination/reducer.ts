export interface InitArg {
  currentPage: number;
  limit: number;
  totalCount: number;
}

export interface State {
  currentPage: number;
  currentCountMin: number;
  currentCountMax: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface Action {
  type: number;
  payload: any;
}

export const ACTIONS = {
  GOTO: 1,
};

export function paginationReducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.GOTO: {
      return {
        ...state,
        currentPage: action.payload,
        currentCountMin: (action.payload - 1) * state.limit,
        currentCountMax: action.payload * state.limit,
      };
    }
    default:
      throw new Error("Unknown Action");
  }
}

export function initState({ currentPage, limit, totalCount }: InitArg): State {
  return {
    limit,
    totalCount,
    totalPages: Math.trunc(totalCount / limit) + 1,
    currentPage: currentPage,
    currentCountMin: (currentPage - 1) * limit,
    currentCountMax: currentPage * limit,
  };
}

export function gotoPage(page: number) {
  return {
    type: ACTIONS.GOTO,
    payload: page,
  };
}
