import { Action } from '@ngrx/store';
import { type } from '../utils/util';

export const ActionTypes = {
  CREATE: type('[Event] Create'),
  CREATE_SUCCESS: type('[Event] Create Success')
};

export class CreateAction implements Action {

  type = ActionTypes.CREATE;

  constructor(public payload) {}
}

export class CreateSuccessAction implements Action {

  type = ActionTypes.CREATE_SUCCESS;

  constructor(public payload) {}
}

export type Actions
  = CreateAction
  | CreateSuccessAction;
