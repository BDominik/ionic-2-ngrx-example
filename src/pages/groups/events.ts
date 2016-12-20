import { Component, OnDestroy } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Event } from '../../models/event';
import { Group } from '../../models/group';
import { EventCreatePage } from './create-event';
import * as fromRoot from '../../reducers';
import * as groupActions from '../../actions/group';

@Component({
  templateUrl: 'events.html'
})
export class EventListPage implements OnDestroy {

  group$: Observable<Group>;
  group: Group;
  groupSubscription: Subscription;
  events$: Observable<Event[]>;

  constructor(
    private modalCtrl: ModalController,
    private store: Store<fromRoot.State>,
    public viewCtrl: ViewController
  ) {
    this.group$ = store.select(fromRoot.getSelectedGroup);

    this.groupSubscription = this.group$.subscribe((group) => {
      this.group = group;
    });

    // TODO: Add the events to the group instead of making this query.
    this.events$ = store.select(fromRoot.getSelectedGroupEvents);
  }

  create() {
    let eventCreateModal = this.modalCtrl.create(EventCreatePage);
    eventCreateModal.present();
  }

  // Order of the callbacks
  // ionViewCanEnter() { console.log('ionViewCanEnter'); }
  ngOnInit() {
    this.groupSubscription.unsubscribe();
  }
  // ionViewDidLoad() { console.log('ionViewDidLoad'); }
  // ionViewWillEnter() { console.log('ionViewWillEnter'); }
  // ionViewDidEnter() { console.log('ionViewDidEnter'); }
  // ionViewWillLeave() { console.log('ionViewWillLeave'); }
  // ionViewDidLeave() { console.log('ionViewDidLeave'); }
  // ionViewCanLeave() { console.log('ionViewCanLeave'); }
  // ionViewWillUnload() { console.log('ionViewWillUnload'); }
  ngOnDestroy() {}
}
