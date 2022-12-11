import { Action, ActionType } from './definitions';
import { Organization, Repository } from 'api/github';

export namespace Actions {
  export function reset(): Action {
    return {
      type: ActionType.RESET,
    };
  }

  export function setLoading(value?: boolean): Action {
    return {
      type: ActionType.SET_LOADING,
      payload: Boolean(value),
    };
  }

  export function setOrganization(value?: Organization): Action {
    return {
      type: ActionType.SET_ORGANIZATION,
      payload: value,
    };
  }

  export function setRepositories(value?: Repository[]): Action {
    return {
      type: ActionType.SET_REPOSITORIES,
      payload: Array.isArray(value) ? value : [],
    };
  }

  export function setPage(value?: number): Action {
    return {
      type: ActionType.SET_PAGE,
      payload: value ?? 0,
    };
  }

  export function setPageSize(value?: number): Action {
    return {
      type: ActionType.SET_PAGE_SIZE,
      payload: value ?? 0,
    };
  }

  export function filterBy(value?: string): Action {
    return {
      type: ActionType.FILTER_BY,
      payload: value ?? '',
    };
  }
}
