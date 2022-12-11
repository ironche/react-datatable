import { createContext, useContext, Dispatch } from 'react';
import { State, Action } from './definitions';
import { Actions } from './actions';

interface ContextInterface {
  state: State;
  dispatch: Dispatch<Action>;
  Actions: typeof Actions;
}

export const HomeContext = createContext({} as ContextInterface);

export function useHomeContext(): ContextInterface {
  return useContext(HomeContext);
}

export { initialState } from './definitions';
export { reducer } from './reducer';
export { Actions } from './actions';
