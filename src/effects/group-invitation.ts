import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { GroupInvitation } from '../models/group-invitation';
import { GroupInvitationService } from '../services';
import { GroupService } from '../services';
import * as groupActions from '../actions/group';
import * as groupInvitationActions from '../actions/group-invitation';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class GroupInvitationEffects {

  constructor(
    private actions$: Actions,
    private groupInvitationService: GroupInvitationService,
    private groupService: GroupService
  ) {}

  @Effect() Accept$: Observable<Action> = this.actions$
    .ofType(groupInvitationActions.ActionTypes.ACCEPT)
    .map(toPayload)
    .switchMap((invitation) => this.groupInvitationService.accept(invitation)
      .mergeMap((invitation) => {
        // TODO: Find another way of executing 2 actions.
        return Observable.concat(Observable.from([new groupInvitationActions.AcceptSuccessAction(invitation), new groupActions.GetAction(invitation.group.id)]));
      }));

  @Effect() Get$: Observable<Action> = this.actions$
    .ofType(groupInvitationActions.ActionTypes.GET)
    .switchMap(() => this.groupInvitationService.load()
      .map((invitations) => new groupInvitationActions.GetSuccessAction(invitations))
    );

  @Effect() Create$: Observable<Action> = this.actions$
    .ofType(groupInvitationActions.ActionTypes.CREATE)
    .map(toPayload)
    .switchMap((userId) => this.groupInvitationService.create(userId)
      .map((user) => new groupInvitationActions.CreateSuccessAction(user))
    );
}
