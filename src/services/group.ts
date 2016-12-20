import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../services/api-gateway';
import { Group } from '../models/group';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupService {

  constructor(
    private api: ApiGateway
  ) {}

  load(): Observable<Group[]> {
    return this.api.get('groups', {})
      .map(response => response.json());
  }

  get(groupId): Observable<Group> {
    return this.api.get(`groups/${groupId}`, {})
      .map(response => response.json());
  }

  create(group): Observable<Group> {

    let data = {
      'name': group.name
    };

    return this.api.post('groups', {}, data)
      .map(response => response.json());
  }
}
