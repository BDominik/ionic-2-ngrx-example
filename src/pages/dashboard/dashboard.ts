import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { SettingsPage } from './settings';
import { GroupCreatePage } from '../groups/create-group';
import { GroupInvitation } from '../../models/group-invitation';
import * as fromRoot from '../../reducers';
import * as groupActions from '../../actions/group';
import * as groupInvitationActions from '../../actions/group-invitation';

@Component({
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit, OnDestroy {

  groupInvitations$: Observable<GroupInvitation[]>;

  constructor(
    private navCtrl: NavController,
    public popoverCtrl: PopoverController,
    private store: Store<fromRoot.State>
  ) {
    this.groupInvitations$ = this.store.select(fromRoot.getGroupInvitations);
  }

  presentPopover(event) {
    let settings = this.popoverCtrl.create(SettingsPage);
    settings.present({
      ev: event
    });
  }

  goToGroupCreationPage() {
    this.navCtrl.push(GroupCreatePage);
  }

  acceptGroupInvitation(event, invitation) {
    this.store.dispatch(new groupInvitationActions.AcceptAction(invitation));
  }

  ngOnInit() {}
  ngOnDestroy() {}
}
