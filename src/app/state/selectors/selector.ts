import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { userInformation } from '../reducers/reducer';

export const selectUser = (state: AppState) => state.key;

export const selectorChangeMenu = createSelector(
  selectUser,
  (state: userInformation) => state.menu
);

export const selectorTypeUser = createSelector(
  selectUser,
  (state: userInformation) => state.typeUser
);

export const selectorDataUser = createSelector(
  selectUser,
  (state: userInformation) => state.user
);
