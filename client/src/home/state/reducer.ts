import { Organization, Repository } from 'api/github';
import { State, initialState, Action, ActionType } from './definitions';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.RESET: {
      return {
        ...initialState,
      };
    }
    case ActionType.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    }
    case ActionType.SET_ORGANIZATION: {
      return {
        ...state,
        organization: action.payload as Organization,
        repositories: [],
      };
    }
    case ActionType.SET_REPOSITORIES: {
      return {
        ...state,
        repositories: action.payload as Repository[],
      };
    }
    case ActionType.SET_PAGE: {
      return {
        ...state,
        page: action.payload as number,
      };
    }
    case ActionType.SET_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.payload as number || state.pageSizes[0],
      };
    }
    case ActionType.FILTER_BY: {
      return {
        ...state,
        filterBy: action.payload as string,
      };
    }
    default:
      throw new Error('Unknown action');
  }
}
