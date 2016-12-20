import { Action } from '@ngrx/store';
import { type } from '../utils/util';


export const ActionTypes = {
  GET_TOKEN: type('[Authentication] Get Token'),
  SET_TOKEN: type('[Authentication] Set Token'),
  TOKEN_NOT_FOUND: type('[Authentication] Token Not Found'),
  AUTHENTICATE: type('[Authentication] Authenticate'),
  AUTHENTICATE_SUCCESS: type('[Authentication] Success'),
  AUTHENTICATE_FAIL: type('[Authentication] Fail'),
  LOGOUT: type('[Authentication] Logout'),
  LOGOUT_SUCCESS: type('[Authentication] Logout Success')
};

export class AuthenticateAction implements Action {

  type = ActionTypes.AUTHENTICATE;

  constructor(public payload) {}
}

export class AuthenticateSuccessAction implements Action {

  type = ActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload) {}
}

export class AuthenticateFailAction implements Action {

  type = ActionTypes.AUTHENTICATE_FAIL;

  constructor() {}
}

export class GetTokenAction implements Action {

  type = ActionTypes.GET_TOKEN;

  constructor() {}
}

export class TokenNotFoundAction implements Action {

  type = ActionTypes.TOKEN_NOT_FOUND;

  constructor() {}
}

export class SetTokenAction implements Action {

  type = ActionTypes.SET_TOKEN;

  constructor(public payload: string) {}
}

export class LogoutAction implements Action {

  type = ActionTypes.LOGOUT;

  constructor() {}
}

export class LogoutSuccessAction implements Action {

  type = ActionTypes.LOGOUT_SUCCESS;

  constructor() {}
}

export type Actions
  = AuthenticateAction
  | AuthenticateSuccessAction
  | AuthenticateFailAction
  | GetTokenAction
  | SetTokenAction
  | TokenNotFoundAction
  | LogoutAction
  | LogoutSuccessAction;
