import { createSelector } from 'reselect';
import { normalize, schema } from 'normalizr';
import { Group } from '../models/group';
import { GroupInvitation } from '../models/group-invitation';
import { User } from '../models/user';
import * as groupInvitationActions from '../actions/group-invitation';

export interface State {
  ids: number[];
  entities: {
    groups: { [id: number]: Group };
    invitations: { [id: number]: GroupInvitation };
    users: { [id: number]: User };
  };
}

const initialState: State = {
  ids: [],
  entities: {
      groups: {},
      invitations: {},
      users: {}
  }
};

// Normalizr Schemas
const eventSchema = new schema.Entity('events');
const userSchema = new schema.Entity('users');
const groupSchema = new schema.Entity('groups');
const invitationSchema = new schema.Entity('invitations', {
  invitee: userSchema,
  inviter: userSchema,
  group: groupSchema
});

export function reducer(state = initialState, action: groupInvitationActions.Actions): State {
  switch (action.type) {

    case groupInvitationActions.ActionTypes.GET_SUCCESS: {

      let groupInvitations = action.payload;
      let response = normalize(action.payload, [invitationSchema]);

      return Object.assign({}, state, {
        ids: [ ...state.ids, ...response.result ],
        entities: response.entities
      });
    }

    case groupInvitationActions.ActionTypes.ACCEPT_SUCCESS: {
        let groupInvitation = action.payload;

        // TODO: Remove the group invitation from the entities?
        return Object.assign({}, state, {
            ids: state.ids.filter(id => id !== groupInvitation.id)
        });
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
export const getInvitationIds = (state: State) => state.ids;
export const getGroupInvitations = createSelector(getEntities, getInvitationIds, (entities, ids) => {
    return ids.map(id => {
        return Object.assign({}, entities.invitations[id], {
            group: entities.groups[<number><any>entities.invitations[id].group],
            invitee: entities.users[<number><any>entities.invitations[id].invitee],
            inviter: entities.users[<number><any>entities.invitations[id].inviter]
        });
    });
});
