import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { UserService } from '../services';
import * as userActions from '../actions/user';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect() GetProfile$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.GET_PROFILE)
    .switchMap(() => this.userService.getProfile()
      .map((user) => new userActions.GetProfileSuccessAction(user))
    );

  @Effect() Search$: Observable<Action> = this.actions$
    .ofType(userActions.ActionTypes.SEARCH)
    .map(toPayload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      if (query === undefined) {
        return of(new userActions.SearchCompletedAction([]));
      }

      return this.userService.search(query)
        .map(users => new userActions.SearchCompletedAction(users))
        .catch(() => of(new userActions.SearchCompletedAction([])));
    });
}
