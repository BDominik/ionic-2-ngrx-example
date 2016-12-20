import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EventListPage } from './events';
import { GroupInvitationPage } from './create-group-invitation';
import { GroupMemberListPage } from './members';

@Component({
  templateUrl: 'tabs.html'
})
export class GroupTabsPage {

  tab1Root: any = EventListPage;
  tab2Root: any = GroupMemberListPage;
  tab3Root: any = GroupInvitationPage;

   groupParams = {
    groupId: this.params.data.groupId
  };
  
  constructor(private params: NavParams) {}
}
