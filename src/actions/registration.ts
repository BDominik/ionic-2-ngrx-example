import { Action } from '@ngrx/store';
import { type } from '../utils/util';


export const ActionTypes = {
  REGISTER: type('[Registration] Register'),
  REGISTER_SUCCESS: type('[Registration] Success')
};

export class RegisterAction implements Action {
  type = ActionTypes.REGISTER;

  constructor(public payload) {}
}

export class RegisterSuccessAction implements Action {
  type = ActionTypes.REGISTER_SUCCESS;

  constructor(public payload) {}
}

export type Actions
  = RegisterAction
  | RegisterSuccessAction;
