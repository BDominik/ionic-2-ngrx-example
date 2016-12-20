import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ViewController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Group } from '../../models/group';
import * as fromRoot from '../../reducers';
import * as eventActions from '../../actions/event';

@Component({
    templateUrl: 'create-event.html'
})
export class EventCreatePage implements OnDestroy {

  private group$: Observable<Group>;
  group: Group;
  private groupSubscription: Subscription;
  eventCreationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private viewCtrl: ViewController
    ) {
        this.group$ = store.select(fromRoot.getSelectedGroup);

        this.groupSubscription = this.group$.subscribe((group) => {
          this.group = group;
        });

        this.eventCreationForm = fb.group({
          group_id: this.group.id,
          name: [],
          start_at: ['2017-01-01 20:00:00'],
          end_at: ['2017-12-15 21:00:00']
        });
    }

    onEventCreation(form) {
      this.store.dispatch(new eventActions.CreateAction(form._value));
      this.eventCreationForm.reset({ group_id: this.group.id });
      this.cancel();
    }

    cancel() {
      this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
      this.groupSubscription.unsubscribe();
    }
}
