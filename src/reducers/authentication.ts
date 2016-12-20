import { createSelector } from 'reselect';
import { User } from '../models/user';
import * as authenticationActions from '../actions/authentication';
import * as groupActions from '../actions/group';
import * as userActions from '../actions/user';

export interface State {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: User | null;
};

const initialState: State = {
  isAuthenticated: false,
  isLoading: true,
  token: null,
  user: null
};

export function reducer(state = initialState, action: authenticationActions.Actions | groupActions.Actions | userActions.Actions): State {
  switch (action.type) {

    /*
    * Authentication
    */
    case authenticationActions.ActionTypes.SET_TOKEN: {
      return {
        isAuthenticated: false,
        isLoading: true,
        token: action.payload,
        user: null
      };
    }

    case authenticationActions.ActionTypes.TOKEN_NOT_FOUND: {
      return {
        isAuthenticated: false,
        isLoading: false,
        token: null,
        user: null
      };
    }

    case authenticationActions.ActionTypes.AUTHENTICATE_SUCCESS: {
      return {
        isAuthenticated: true,
        isLoading: false,
        token: action.payload,
        user: null
      };
    }

    case authenticationActions.ActionTypes.LOGOUT_SUCCESS: {
      return {
        isAuthenticated: false,
        isLoading: false,
        token: null,
        user: null
      };
    }

    /*
    * Groups
    */
    case groupActions.ActionTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false
      });
    }

    /*
    * Users
    */
    case userActions.ActionTypes.GET_PROFILE_SUCCESS: {
      let user = action.payload;
      return Object.assign({}, state, {
        user: user
      });
    }

    default: {
      return state;
    }
  }
}

export const getAccessToken = (state: State) => state.token;
export const getAuthenticated = (state: State) => state.isAuthenticated;
export const getLoading = (state: State) => state.isLoading;
