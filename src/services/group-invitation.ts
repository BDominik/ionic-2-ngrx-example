import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { ApiGateway } from '../services/api-gateway';
import { GroupInvitation } from '../models/group-invitation';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupInvitationService {

  constructor(
    private api: ApiGateway
  ) {}

  accept(invitation): Observable<GroupInvitation> {
    return this.api.post(`group-invitations/${invitation.id}/accept`, {}, {})
      .map(response => response.json());
  }

  load(): Observable<GroupInvitation[]> {
    return this.api.get('me/invitations', {})
      .map(response => response.json());
  }

  create(invitation): Observable<GroupInvitation> {

    let data = {
      'user_id': invitation.userId
    };

    return this.api.post(`groups/${invitation.groupId}/invitations`, {}, data)
      .map(response => response.json());
  }
}
