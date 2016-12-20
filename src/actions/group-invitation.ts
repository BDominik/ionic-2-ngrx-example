import { Action } from '@ngrx/store';
import { type } from '../utils/util';
import { GroupInvitation } from '../models/group-invitation';

export const ActionTypes = {
  ACCEPT: type('[Group Invitation] Accept'),
  ACCEPT_SUCCESS: type('[Group Invitation] Accept Success'),
  CREATE: type('[Group Invitation] Create'),
  CREATE_SUCCESS: type('[Group Invitation] Create Success'),
  GET: type('[Group Invitation] Get'),
  GET_SUCCESS: type('[Group Invitation] Get Success')
};

export class AcceptAction implements Action {
  type = ActionTypes.ACCEPT;
  constructor(public payload: GroupInvitation) {}
}

export class AcceptSuccessAction implements Action {
  type = ActionTypes.ACCEPT_SUCCESS;
  constructor(public payload: GroupInvitation) {}
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
  constructor() {}
}

export class GetSuccessAction implements Action {
  type = ActionTypes.GET_SUCCESS;
  constructor(public payload: GroupInvitation[]) {}
}

export type Actions
  = AcceptAction
  | AcceptSuccessAction
  | GetAction
  | GetSuccessAction
  | CreateAction
  | CreateSuccessAction;
