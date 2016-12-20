import { Action } from '@ngrx/store';
import { type } from '../utils/util';
import { Group } from '../models/group';

export const ActionTypes = {
  LOAD: type('[Group] Load'),
  LOAD_SUCCESS: type('[Group] Load Success'),
  CREATE: type('[Group] Create'),
  CREATE_SUCCESS: type('[Group] Create Success'),
  GET: type('[Group] Get'),
  GET_SUCCESS: type('[Group] Get Success'),
  SELECT: type('[Group] Select'),
  SELECT_COMPLETED: type('[Group] Select Completed'),
  UNSELECT: type('[Group] Unselect')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor() {}
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload) {}
}

export class CreateAction implements Action {
  type = ActionTypes.CREATE;
  constructor(public payload) {}
}

export class CreateSuccessAction implements Action {
  type = ActionTypes.CREATE_SUCCESS;
  constructor(public payload) {}
}

export class GetAction implements Action {
  type = ActionTypes.GET;
  constructor(public payload: number) {}
}

export class GetSuccessAction implements Action {
  type = ActionTypes.GET_SUCCESS;
  constructor(public payload: Group) {}
}

export class SelectAction implements Action {
  type = ActionTypes.SELECT;
  constructor(public payload) {}
}

export class SelectCompletedAction implements Action {
  type = ActionTypes.SELECT_COMPLETED;
  constructor() {}
}

export class UnselectAction implements Action {
  type = ActionTypes.UNSELECT;
  constructor() {}
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | CreateAction
  | CreateSuccessAction
  | GetAction
  | GetSuccessAction
  | SelectAction
  | SelectCompletedAction
  | UnselectAction;
