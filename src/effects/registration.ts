import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services';
import { RegistrationService } from '../services';
import * as authenticationActions from '../actions/authentication';
import * as registrationActions from '../actions/registration';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class RegistrationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private registrationService: RegistrationService
  ) {}

  @Effect() register$: Observable<Action> = this.actions$
    .ofType(registrationActions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap((user) => this.registrationService.register(user)
      .do((token) => this.authenticationService.storeToken(token))
      .map((token) => new authenticationActions.AuthenticateSuccessAction(token))
    );
}
