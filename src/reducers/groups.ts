import { createSelector } from 'reselect';
import { normalize, schema } from 'normalizr';
import { Event } from '../models/event';
import { Group } from '../models/group';
import { GroupInvitation } from '../models/group-invitation';
import { User } from '../models/user';
import * as authenticationActions from '../actions/authentication';
import * as eventActions from '../actions/event';
import * as groupActions from '../actions/group';


export interface State {
  ids: number[];
  entities: {
    groups: { [id: number]: Group };
    events: { [id: number]: Event };
    invitations: { [id: number]: GroupInvitation };
    users: { [id: number]: User };
  };
  selectingGroup: boolean;
  selectedGroupId: number | null;
};

const initialState: State = {
  ids: [],
  entities: {
      groups: {},
      events: {},
      invitations: {},
      users: {}
  },
  selectingGroup: false,
  selectedGroupId: null,
};

// Normalizr Schemas
const eventSchema = new schema.Entity('events');
const invitationSchema = new schema.Entity('invitations');
const userSchema = new schema.Entity('users');

const groupSchema = new schema.Entity('groups', {
 events: [ eventSchema ],
 invitations: [ invitationSchema ],
 members: [ userSchema ],
 owner: userSchema
});

export function reducer(state = initialState, action: groupActions.Actions | authenticationActions.Actions | eventActions.Actions): State {
  switch (action.type) {

    case groupActions.ActionTypes.LOAD_SUCCESS: {

      const response = normalize(action.payload, [ groupSchema ]);

      return Object.assign({}, state, {
        ids: [ ...state.ids, ...response.result ],
        entities: response.entities
      });
    }

    case groupActions.ActionTypes.GET_SUCCESS: {
      const response = normalize(action.payload, groupSchema);

      return Object.assign({}, state, {
        ids: [ ...state.ids, ...response.result ],
        entities: Object.assign({}, state.entities, {
          groups: Object.assign({}, state.entities.groups, {
            [response.result]: response.entities.groups[response.result]
          }),
          events: Object.assign({}, state.entities.events, response.entities.events),
          invitations: Object.assign({}, state.entities.invitations, response.entities.invitations),
          users: Object.assign({}, state.entities.users, response.entities.users),
        })
      });
    }

    case groupActions.ActionTypes.CREATE_SUCCESS: {

      let group = action.payload;
      let normalizedGroup = normalize(group, groupSchema);

      return Object.assign({}, state, {
        ids: [ ...state.ids, ...group.id ],
        entities: Object.assign({}, state.entities, {
          groups: Object.assign({}, state.entities.groups, {
            [group.id]: normalizedGroup.entities.groups[group.id]
          }),
          users: Object.assign({}, state.entities.users, normalizedGroup.entities.users)
        }),
        selectingGroup: true,
        selectedGroupId: group.id
      });
    }

    case groupActions.ActionTypes.SELECT: {
      return Object.assign({}, state, {
        selectingGroup: true,
        selectedGroupId: action.payload
      });
    }

    case groupActions.ActionTypes.SELECT_COMPLETED: {
      return Object.assign({}, state, {
        selectingGroup: false
      });
    }

    case groupActions.ActionTypes.UNSELECT: {
      return Object.assign({}, state, {
        selectedGroupId: null
      });
    }

    /*
     * Authentication
     */
    case authenticationActions.ActionTypes.LOGOUT_SUCCESS: {
      return initialState;
    }

    /*
     * Events
     */
    case eventActions.ActionTypes.CREATE_SUCCESS: {

      let event = action.payload;

      return Object.assign({}, state, {
            entities: Object.assign({}, state.entities, {
                events: Object.assign({}, state.entities.events, {
                    [event.id]: event
                }),
                groups: Object.assign({}, state.entities.groups, {
                    [event.group_id]:
                        Object.assign({}, state.entities.groups[event.group_id], {
                            'events': [...state.entities.groups[event.group_id].events, event.id]
                        })
                })
            })
        });
    }

    default: {
      return state;
    }
  }
}


export const getEventEntities = (state: State) => state.entities.events;
export const getGroupEntities = (state: State) => state.entities.groups;
export const getUserEntities = (state: State) => state.entities.users;

export const getGroupIds = (state: State) => state.ids;
export const getSelectedId = (state: State) => state.selectedGroupId;

export const getSelected = createSelector(getGroupEntities, getSelectedId, (groups, selectedId) => {
  return groups[selectedId];
});

export const isGroupSelected = (state: State) => {
  return {
    selectingGroup: state.selectingGroup,
    selectedGroupId: state.selectedGroupId
  }
}

export const getAll = createSelector(getGroupEntities, getGroupIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

export const getSelectedGroupEvents = createSelector(getEventEntities, getSelected, (events, group) => {
  return group.events.map(id => events[id]);
});

export const getMembers = createSelector(getUserEntities, getSelected, (users, group) => {
  return group.members.map(id => users[id]);
});
