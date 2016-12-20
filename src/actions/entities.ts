import { Action } from '@ngrx/store';
import { type } from '../utils/util';

export const ActionTypes = {
  LOAD: type('[Entities] Load'),
  LOAD_SUCCESS: type('[Entities] Load Success')
};

export class LoadAction implements Action {

  type = ActionTypes.LOAD;

  constructor() {}
}

export class LoadSuccessAction implements Action {

  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
  | LoadSuccessAction;
