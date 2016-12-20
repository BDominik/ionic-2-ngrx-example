import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as groupInvitationActions from '../../actions/group-invitation';
import * as userActions from '../../actions/user';
import { Group } from '../../models/group';
import { User } from '../../models/user';

@Component({
    templateUrl: 'create-group-invitation.html'
})
export class GroupInvitationPage implements OnInit, OnDestroy {

  users$: Observable<User[]>;
  group$: Observable<Group>;
  group: Group;
  groupSubscription: Subscription;
  groupInvitationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private viewCtrl: ViewController
  ) {
    this.users$ = store.select(fromRoot.getSearchResults);

    this.group$ = store.select(fromRoot.getSelectedGroup);

    this.groupSubscription = this.group$.subscribe((group) => {
      this.group = group;
    });
  }

  onTeamMemberInvite(form) {}

  search(event) {
    this.store.dispatch(new userActions.SearchAction(event.target.value));
  }

  invite(event, userId) {
    let invitation = {
      groupId: this.group.id,
      userId: userId,
    };

    this.store.dispatch(new groupInvitationActions.CreateAction(invitation));
  }

  cancel() {}

  ngOnInit() {
    this.groupSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.groupSubscription.unsubscribe();    
  }
}
