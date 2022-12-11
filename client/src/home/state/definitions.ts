import { Organization, Repository } from 'api/github';

export interface State {
  isLoading?: boolean;
  organization?: Organization;
  repositories: Repository[];
  page: number;
  pageSize: number;
  pageSizes: number[];
  filterBy: string,
}

export const initialState: State = {
  repositories: [],
  page: 0,
  pageSize: 10,
  pageSizes: [10, 25, 50, 100],
  filterBy: '',
};

export enum ActionType {
  RESET,
  SET_LOADING,
  SET_ORGANIZATION,
  SET_REPOSITORIES,
  SET_PAGE,
  SET_PAGE_SIZE,
  FILTER_BY,
}

export interface Action {
  type: ActionType;
  payload?: unknown;
}
