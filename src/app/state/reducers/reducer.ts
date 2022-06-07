import {  createReducer, on } from "@ngrx/store";
import { clickMenu, loadUser } from "../actions/actions";

export interface userInformation {
  user: string;
  typeUser: string;
  menu: boolean;
}

export const initialState: userInformation = {
  user: "",
  typeUser: "",
  menu: true,
};

export const Reducer = createReducer(
  initialState,
  on(loadUser, (state, { data }) => {
    const { user, typeUser } = data;
    return { ...state, user, typeUser };
  }),
  on(clickMenu, (state) => {
    return { ...state, menu: !state.menu };
  })
);
