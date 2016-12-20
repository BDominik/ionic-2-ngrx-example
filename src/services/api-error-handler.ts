import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApiGateway } from './api-gateway';
import * as authenticationActions from '../actions/authentication';
import * as fromRoot from '../reducers';

@Injectable()
export class ApiErrorHandler {

  constructor(
    private api: ApiGateway,
    private store: Store<fromRoot.State>
  ) {

    console.info('API ERROR HANDLER CONSTRUCTED');

    // api.errors$.subscribe(
    //   (value: any) => {

    //     console.group("Api Error Handler");
    //     console.log(value.status, "status code detected.");
    //     console.dir(value);
    //     console.groupEnd();

    //     // If the user made a request that they were not authorized
    //     // to, it's possible that their session has expired. Let's
    //     // refresh the page and let the server-side routing move the
    //     // user to a more appropriate landing page.
    //     if (value.status === 401) {
    //       console.log('loging out...');
    //       this.store.dispatch(new authenticationActions.LogoutAction());
    //     }
    // });
  }
}
