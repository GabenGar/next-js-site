export interface InitArg {
  currentPage: number;
  limit: number;
  totalCount: number;
}

export interface State {
  currentPage: number;
  currentSelection: number
  currentCountMin: number;
  currentCountMax: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface Action {
  type: number;
  payload: number;
}

export const ACTIONS = {
  GOTO: 1,
  SELECT: 2,
};

export function paginationReducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.GOTO: {
      return {
        ...state,
        currentPage: action.payload,
        currentSelection: action.payload,
        currentCountMin: (action.payload - 1) * state.limit,
        currentCountMax: action.payload * state.limit,
      };
    }
    case ACTIONS.SELECT: {
      return {
        ...state,
        currentSelection: action.payload
      };
    }
    default:
      throw new Error("Unknown Action");
  }
}

export function initState({ currentPage, limit, totalCount }: InitArg): State {
  const totalPages = Math.ceil(totalCount / limit);
  return {
    limit,
    totalCount,
    totalPages: totalPages >= 1 ? totalPages : 1,
    currentPage: currentPage,
    currentSelection: currentPage,
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

export function selectPage(page: number) {
  return {
    type: ACTIONS.SELECT,
    payload: page,
  };
}
