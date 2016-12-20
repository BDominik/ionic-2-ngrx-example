import { createSelector } from 'reselect';
import { User } from '../models/user';
import * as groupInvitationActions from '../actions/group-invitation';
import * as userActions from '../actions/user';

export interface State {
  ids: number[];
  users: { [id: number]: User };
  loading: boolean;
  query: string;
};

const initialState: State = {
  ids: [],
  users: {},
  loading: false,
  query: ''
};

export function reducer(state = initialState, action: userActions.Actions | groupInvitationActions.Actions): State {
  switch (action.type) {

    case userActions.ActionTypes.SEARCH: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          users: {},
          loading: false,
          query
        };
      }

      return Object.assign({}, state, {
        query,
        loading: true
      });
    }

    case userActions.ActionTypes.SEARCH_COMPLETED: {
      const users = action.payload;

      const userIds = users.map(user => user.id);
      const usersResult = users.reduce((users: { [id: number]: User }, user: User) => {
        return Object.assign(users, {
          [user.id]: user
        });
      }, {});

      return {
        ids: userIds,
        users: Object.assign({}, state.users, usersResult),
        loading: false,
        query: state.query
      };
    }

    /*
     * Groups
     */    
    case groupInvitationActions.ActionTypes.CREATE_SUCCESS: {
      return {
          ids: [],
          users: {},
          loading: false,
          query: ''
      }
    }

    default: {
      return state;
    }
  }
}

export const getUserEntities = (state: State) => state.users;
export const getUserIds = (state: State) => state.ids;
export const getUsers = createSelector(getUserEntities, getUserIds, (users, ids) => {
  return ids.map(id => users[id]);
});
