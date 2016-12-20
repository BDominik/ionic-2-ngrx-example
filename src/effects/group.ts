import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { GroupService } from '../services';
import * as groupActions from '../actions/group';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private groupService: GroupService
  ) {}

  @Effect() load$: Observable<Action> = this.actions$
    .ofType(groupActions.ActionTypes.LOAD)
    .switchMap(() => this.groupService.load()
      .map((groups) => new groupActions.LoadSuccessAction(groups))
    );

  @Effect() get$: Observable<Action> = this.actions$
    .ofType(groupActions.ActionTypes.GET)
    .switchMap((action) => {
      return this.groupService.get(action.payload)
      .map((group) => new groupActions.GetSuccessAction(group))
    });

  @Effect() create$: Observable<Action> = this.actions$
    .ofType(groupActions.ActionTypes.CREATE)
    .map(toPayload)
    .switchMap((group) => this.groupService.create(group)
      .map((group) => new groupActions.CreateSuccessAction(group))
    );

  @Effect() select$: Observable<Action> = this.actions$
    .ofType(groupActions.ActionTypes.SELECT)
    .flatMap(() => of(new groupActions.SelectCompletedAction()));
}
