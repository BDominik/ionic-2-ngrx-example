import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthenticationEffects } from '../effects/authentication';
import { EventEffects } from '../effects/event';
import { GroupEffects } from '../effects/group';
import { GroupInvitationEffects } from '../effects/group-invitation';
import { RegistrationEffects } from '../effects/registration';
import { UserEffects } from '../effects/user';

import { ApiGateway } from '../services';
import { AuthenticationService } from '../services';
import { EventService } from '../services';
import { GroupService } from '../services';
import { GroupInvitationService } from '../services';
import { RegistrationService } from '../services';
import { UserService } from '../services';

import { App } from './app.component';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { EventCreatePage } from '../pages/groups/create-event';
import { EventListPage } from '../pages/groups/events';
import { GroupCreatePage } from '../pages/groups/create-group';
import { GroupInvitationPage } from '../pages/groups/create-group-invitation';
import { GroupMemberListPage } from '../pages/groups/members';
import { GroupTabsPage } from '../pages/groups/tabs';
import { RegistrationPage } from '../pages/registration/registration';
import { SettingsPage } from '../pages/dashboard/settings';

import { reducer } from '../reducers';

@NgModule({
  declarations: [
    App,
    AuthenticationPage,
    DashboardPage,
    EventCreatePage,
    EventListPage,
    GroupCreatePage,
    GroupInvitationPage,
    GroupMemberListPage,
    GroupTabsPage,
    RegistrationPage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(App),
    StoreModule.provideStore(reducer),
    // StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(AuthenticationEffects),
    EffectsModule.run(EventEffects),
    EffectsModule.run(GroupEffects),
    EffectsModule.run(GroupInvitationEffects),
    EffectsModule.run(RegistrationEffects),
    EffectsModule.run(UserEffects),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    AuthenticationPage,
    DashboardPage,
    EventCreatePage,
    EventListPage,
    GroupCreatePage,
    GroupInvitationPage,
    GroupMemberListPage,
    GroupTabsPage,
    RegistrationPage,
    SettingsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    ApiGateway,
    AuthenticationService,
    EventService,
    GroupService,
    GroupInvitationService,
    RegistrationService,
    UserService
  ]
})
export class AppModule {}
