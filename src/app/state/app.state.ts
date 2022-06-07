import { ActionReducerMap } from '@ngrx/store';
import { Reducer, userInformation } from './reducers/reducer';

export interface AppState {
  key: userInformation;
}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  key: Reducer,
};
