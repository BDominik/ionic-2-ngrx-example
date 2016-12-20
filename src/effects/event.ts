import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventService } from '../services';
import * as eventActions from '../actions/event';

@Injectable()
export class EventEffects {
  constructor(
    private actions$: Actions,
    private eventService: EventService
  ) {}

  @Effect() create$: Observable<Action> = this.actions$
    .ofType(eventActions.ActionTypes.CREATE)
    .map(toPayload)
    .switchMap((event) => this.eventService.schedule(event)
        .map((event) => new eventActions.CreateSuccessAction(event))
    );
}
