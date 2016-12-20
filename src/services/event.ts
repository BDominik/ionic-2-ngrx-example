import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../services/api-gateway';
import { Event } from '../models/event';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

  constructor(
    private api: ApiGateway
  ) {}

  schedule(event): Observable<Event> {

    let data = {
      'group_id': event.group_id,
      'name': event.name,
      'start_at': event.start_at,
      'end_at': event.end_at
    };

    return this.api.post(`groups/${event.group_id}/events`, {}, data)
      .map(response => response.json());
  }
}
