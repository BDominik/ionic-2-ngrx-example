import { Component, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { App, NavController, ViewController } from 'ionic-angular';
import { AuthenticationPage } from '../authentication/authentication';
import * as fromRoot from '../../reducers';
import * as authenticationActions from '../../actions/authentication';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnDestroy {

  private isAuthenticated$: Observable<boolean>;
  private isAuthenticatedSubscription: Subscription;

  constructor(
    private app: App,
    private navCtrl: NavController,
    private store: Store<fromRoot.State>,
    private viewCtrl: ViewController
  ) {

    this.isAuthenticated$ = store.select(fromRoot.getAuthenticateStatus)
      .filter(isAuthenticated => !isAuthenticated);

    this.isAuthenticatedSubscription = this.isAuthenticated$.subscribe((isUserAuthenticated) => {
      this.close();
      this.app.getRootNav().setRoot(AuthenticationPage);
    });
  }

  logout() {
    this.store.dispatch(new authenticationActions.LogoutAction());
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ngOnDestroy() {
    this.isAuthenticatedSubscription.unsubscribe();
  }
}
