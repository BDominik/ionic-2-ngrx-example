import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ApiGateway } from '../services/api-gateway';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(
    private api: ApiGateway,
    private storage: Storage,
  ) {}

  authenticate(credentials): Observable<string> {

    let data = {
      'email': credentials.email,
      'password': credentials.password
    };

    return this.api.post('authentication', {}, data)
      .map((response) => response.json())
      .map((data) => data.access_token)
      .catch(error => Observable.throw(error));
  }

  getToken(): Observable<string> {
    return Observable.fromPromise(this.storage.get('access_token').then(token => token));
  }

  storeToken(token) {
    this.storage.set('access_token', token);
  }

  removeToken(): Observable<string> {
    return Observable.fromPromise(this.storage.remove('access_token').then(token => token));
  }
}
