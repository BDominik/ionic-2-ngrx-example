import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AuthenticationService } from '../services';
import * as authenticationActions from '../actions/authentication';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthenticationEffects {

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) {}

  @Effect() getToken$: Observable<Action> = this.actions$
    .ofType(authenticationActions.ActionTypes.GET_TOKEN)
    .startWith(new authenticationActions.GetTokenAction())
    .switchMap(() => this.authenticationService.getToken()
      .map((token) => {
        if (token) {
          return new authenticationActions.AuthenticateSuccessAction(token)
        } else {
          return new authenticationActions.TokenNotFoundAction()
        }
      })
    );

  @Effect() authenticate$: Observable<Action> = this.actions$
    .ofType(authenticationActions.ActionTypes.AUTHENTICATE)
    .map(toPayload)
    .switchMap((credentials) => this.authenticationService.authenticate(credentials)
      .do((token) => this.authenticationService.storeToken(token))
      .map((token) => new authenticationActions.AuthenticateSuccessAction(token))
      .catch(error => of(new authenticationActions.AuthenticateFailAction()))
    );

  @Effect() logout$: Observable<Action> = this.actions$
    // Listen for the 'LOGOUT' action
    .ofType(authenticationActions.ActionTypes.LOGOUT)
    .do((token) => this.authenticationService.removeToken())
    .switchMap(() => of(new authenticationActions.LogoutSuccessAction()));
}
