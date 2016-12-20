import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NavController, ViewController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { GroupTabsPage } from './tabs';
import * as fromRoot from '../../reducers';
import * as groupActions from '../../actions/group';

@Component({
    templateUrl: 'create-group.html'
})
export class GroupCreatePage implements OnDestroy {

  selectedGroupId$: Observable<number | null>;
  selectedGroupIdSubscription: Subscription;
  groupCreationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private store: Store<fromRoot.State>,
    private viewCtrl: ViewController
  ) {
    this.groupCreationForm = fb.group({
      name: []
    });
  }

  onGroupCreation(form) {
    this.store.dispatch(new groupActions.CreateAction(form._value));
    this.groupCreationForm.reset();
  }

  goToGroupPage() {
    this.navCtrl.setRoot(GroupTabsPage);
  }

  ngOnDestroy() {}
}
