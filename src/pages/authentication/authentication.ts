import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as authenticationActions from '../../actions/authentication';
import { DashboardPage } from '../dashboard/dashboard';
import { RegistrationPage } from '../registration/registration';

@Component({
  templateUrl: 'authentication.html'
})
export class AuthenticationPage implements OnDestroy {

    authenticationForm: FormGroup;
    private isAuthenticated$: Observable<boolean>;
    private isAuthenticatedSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private store: Store<fromRoot.State>
  ) {
    this.isAuthenticated$ = store.select(fromRoot.getAuthenticateStatus)
        .filter(isAuthenticated => isAuthenticated);

    this.isAuthenticatedSubscription = this.isAuthenticated$.subscribe(isAuthenticated => {
        this.goToHomepage();
    });

    this.authenticationForm = fb.group({
      email: [],
      password: []
    });
  }

  onAuthenticate(form) {
    this.store.dispatch(new authenticationActions.AuthenticateAction(form._value));
  }

  goToRegistrationPage() {
    this.navCtrl.push(RegistrationPage);
  }

  goToHomepage() {
      this.navCtrl.setRoot(DashboardPage);
  }

  ngOnDestroy() {
    this.isAuthenticatedSubscription.unsubscribe();
  }
}
