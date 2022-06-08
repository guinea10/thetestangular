import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
  '[Load Action] in the Login',
  props<{ data: { user: string; typeUser: string } }>()
);

export const clickMenu = createAction('[Home Action] click Menu');
