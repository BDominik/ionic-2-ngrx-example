import { Action } from '@ngrx/store';
import { type } from '../utils/util';
import { User } from '../models/user';

export const ActionTypes = {
  GET_PROFILE: type('[User] Get Profile'),
  GET_PROFILE_SUCCESS: type('[User] Get Profile Success'),
  SEARCH: type('[User] Search'),
  SEARCH_COMPLETED: type('[User] Search Completed')
};

export class GetProfileAction implements Action {
  type = ActionTypes.GET_PROFILE;
  constructor() {}
}

export class GetProfileSuccessAction implements Action {
  type = ActionTypes.GET_PROFILE_SUCCESS;
  constructor(public payload: User) {}
}

export class SearchAction implements Action {
  type = ActionTypes.SEARCH;
  constructor(public payload: string) {}
}

export class SearchCompletedAction implements Action {
  type = ActionTypes.SEARCH_COMPLETED;
  constructor(public payload: User[]) {}
}

export type Actions
  = GetProfileAction
  | GetProfileSuccessAction
  | SearchAction
  | SearchCompletedAction;
