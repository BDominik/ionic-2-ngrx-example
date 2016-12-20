import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../services/api-gateway';
import { User } from '../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private api: ApiGateway) {}

  getProfile(): Observable<User> {
    return this.api.get('me', {})
      .map(response => response.json());
  }

  search(query): Observable<User[]> {
    return this.api.get('users/search', {'query':query})
      .map(response => response.json());
  }
}
