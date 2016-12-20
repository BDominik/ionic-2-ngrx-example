import { Component, ViewChild } from '@angular/core';
import { LoadingController, MenuController, Nav, Platform } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { Group } from '../models/group'; 
import { GroupTabsPage } from '../pages/groups/tabs';
import { RegistrationPage } from '../pages/registration/registration';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as groupActions from '../actions/group';
import * as groupInvitationActions from '../actions/group-invitation';
import * as userActions from '../actions/user';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}> = [];

  isAuthenticated$ : Observable<boolean>;
  isLoading$: Observable<boolean>;
  groups$: Observable<Group[]>;
  selectedGroupId$: Observable<number | null>;
  loader: any;

  isGroupSelected$: Observable<any>;

  constructor(
    private loadingCtrl: LoadingController,
    private menu: MenuController,
    private platform: Platform,
    private store: Store<fromRoot.State>
  ) {

    this.initializeApp();

    this.pages = [
      { title: 'Dashboard', component: DashboardPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // StatusBar.styleDefault();
      // Splashscreen.hide();

      this.groups$ = this.store.select(fromRoot.getGroups);

      this.isAuthenticated$ = this.store.select(fromRoot.getAuthenticateStatus);
      this.isLoading$ = this.store.select(fromRoot.getLoadingStatus);

      let source = Observable.combineLatest(
        this.isLoading$,
        this.isAuthenticated$
      );

      source.subscribe(([isLoading, isAuthenticated]) => {

        if (isAuthenticated) {
          // TODO: Merge into one action?
          this.store.dispatch(new groupActions.LoadAction());
          this.store.dispatch(new userActions.GetProfileAction());
          this.store.dispatch(new groupInvitationActions.GetAction());
          this.menu.swipeEnable(true);
        } else {
          this.menu.swipeEnable(false);
        }

        if (!isLoading && !isAuthenticated) {
          this.nav.setRoot(AuthenticationPage);
        }

        if (isLoading && isAuthenticated) {
          this.nav.setRoot(DashboardPage);
        }
      });

      this.isGroupSelected$ = this.store.select(fromRoot.isGroupSelected)
        .filter((isGroupSelected) => isGroupSelected.selectingGroup);

      this.isGroupSelected$.subscribe((isGroupSelected) => {
        this.goToGroupPage(isGroupSelected.selectedGroupId);
      });
    });
  }

  openPage(page) {
    this.closeMenu();
    this.nav.setRoot(page.component);
  }

  onGroupSelect(group) {
    this.store.dispatch(new groupActions.SelectAction(group.id));
  }

  goToGroupPage(groupId) {
    this.closeMenu();
    this.nav.setRoot(GroupTabsPage, { groupId: groupId });
  }

  private closeMenu() {
    this.menu.close();
  }
}
