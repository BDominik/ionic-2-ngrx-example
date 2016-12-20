import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Group } from '../../models/group';
import { GroupMember } from '../../models/group-member';
import * as fromRoot from '../../reducers';

@Component({
  templateUrl: 'members.html'
})
export class GroupMemberListPage implements OnDestroy {

  group$: Observable<Group>;
  group: Group;
  groupSubscription: Subscription;
  groupMembers$: Observable<GroupMember[]>;

  constructor(
    private navCtrl: NavController,
    private store: Store<fromRoot.State>
  ) {
    this.group$ = store.select(fromRoot.getSelectedGroup);

    this.groupSubscription = this.group$.subscribe((group) => {
      this.group = group;
    });

    this.groupMembers$ = store.select(fromRoot.getGroupMembers);
  }

  ngOnDestroy() {
      this.groupSubscription.unsubscribe();
  }
}
