import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as registrationActions from '../../actions/registration';

@Component({
  templateUrl: 'registration.html'
})
export class RegistrationPage implements OnDestroy {

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {
    this.registrationForm = fb.group({
      first_name: [],
      last_name: [],
      email: [],
      password: []
    });
  }

  onRegister(form) {
    this.store.dispatch(new registrationActions.RegisterAction(form._value));
  }

  ngOnDestroy() {}
}
