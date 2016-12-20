import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';
import * as fromAuthentication from './authentication';
import * as fromGroups from './groups';
import * as fromGroupInvitations from './group-invitations';
import * as fromUserSearch from './user-search';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/mapTo';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/switchMapTo';
// import 'rxjs/add/operator/toArray';
// import 'rxjs/add/observable/of';

export interface State {
  authentication: fromAuthentication.State;
  groups: fromGroups.State;
  groupInvitations: fromGroups.State;
  userSearch: fromUserSearch.State
}

const reducers = {
  authentication: fromAuthentication.reducer,
  groups: fromGroups.reducer,
  groupInvitations: fromGroupInvitations.reducer,
  userSearch: fromUserSearch.reducer
};

const developmentReducer: ActionReducer<State> = compose(combineReducers)(reducers);

export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}

/*
 * Authentication
 */
export const getAuthenticateState = (state: State) => state.authentication;
export const getAccessToken = createSelector(getAuthenticateState, fromAuthentication.getAccessToken);
export const getAuthenticateStatus = createSelector(getAuthenticateState, fromAuthentication.getAuthenticated);
export const getLoadingStatus = createSelector(getAuthenticateState, fromAuthentication.getLoading);

/*
 * Groups
 */
export const getGroupsState = (state: State) => state.groups;
export const getGroups = createSelector(getGroupsState, fromGroups.getAll);
export const getSelectedGroup = createSelector(getGroupsState, fromGroups.getSelected);
export const getSelectedGroupId = createSelector(getGroupsState, fromGroups.getSelectedId);
export const isGroupSelected = createSelector(getGroupsState, fromGroups.isGroupSelected);
export const getSelectedGroupEvents = createSelector(getGroupsState, fromGroups.getSelectedGroupEvents);
export const getGroupMembers = createSelector(getGroupsState, fromGroups.getMembers);

/*
 * Search
 */
export const getUserSearchState = (state: State) => state.userSearch;
export const getSearchResults = createSelector(getUserSearchState, fromUserSearch.getUsers);

/*
 * Group invitations
 */
export const getGroupInvitationsState = (state: State) => state.groupInvitations;
export const getGroupInvitations = createSelector(getGroupInvitationsState, fromGroupInvitations.getGroupInvitations);
