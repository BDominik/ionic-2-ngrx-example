import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../services/api-gateway';
import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService {

  constructor(private api: ApiGateway) {}

  register(user): Observable<string> {
    return this.api.post('registration', {}, user)
      .map(response => response.json())
      .map((data) => data.access_token);
  }
}
