// Sources:
// https://www.bennadel.com/blog/3047-creating-specialized-http-clients-in-angular-2-beta-8.htm
// https://blog.sstorie.com/adapting-ben-nadels-apigateway-to-pure-typescript/
// TODO: Finish the error handling.
import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { Subject } from "rxjs/Subject";
import * as fromRoot from '../reducers';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';

export class GatewayOptions {
  method: RequestMethod;
  url: string;
  headers = new Headers();
  params = {};
  data = {};
}

export const apiUrl = 'https://laravel-tdd-example.dev/api/';

@Injectable()
export class ApiGateway {

  private accessToken$: Observable<string>;
  private token: string;

  // Define the internal Subject we'll use to push errors
  private errorsSubject = new Subject<any>();

  // Provide the *public* Observable that clients can subscribe to
  errors$: Observable<any>;

  constructor(
    private http: Http,
    private store: Store<fromRoot.State>
  ) {

    this.accessToken$ = store.select(fromRoot.getAccessToken)
      .filter(token => token !== null);

    this.accessToken$.subscribe((token) => {
      this.token = token;
    });

    // Create our observables from the subjects
    // this.errors$ = this.errorsSubject.asObservable();
  }

  get(url: string, params: any): Observable<Response> {

    let options = new GatewayOptions();

    options.method = RequestMethod.Get;
    options.url = url;
    options.params = params;

    return this.request(options);
  }

  post(url: string, params: any, data: any): Observable<any> {

    if (!data) {
      data = params;
      params = {};
    }

    let options = new GatewayOptions();

    options.method = RequestMethod.Post;
    options.url = url;
    options.params = params;
    options.data = data;

    return this.request(options);
  }

  private request(options: GatewayOptions): Observable<any> {

    options.method = (options.method || RequestMethod.Get);
    options.url = apiUrl + options.url;
    options.params = (options.params || {});
    options.data = (options.data || {});

    options.headers.append('Authorization', `Bearer ${this.token}`);
    options.headers.append('X-Requested-With', 'XMLHttpRequest');
    // options.headers.append('Content-Type', 'application/json');

    let requestOptions = new RequestOptions();

    requestOptions.method = options.method;
    requestOptions.url = options.url;
    requestOptions.headers = options.headers;
    requestOptions.search = this.buildUrlSearchParams(options.params);
    requestOptions.body = options.data;

    return this.http.request(options.url, requestOptions)
      .catch((error: any) => {
        console.log('API error catched:', error);
        // this.errorsSubject.next(error);
        return Observable.throw(error);
      })
      .finally(() => {});
  }

  private buildUrlSearchParams(params: any): URLSearchParams {
        var searchParams = new URLSearchParams();
        for (var key in params) {
            searchParams.append(key, params[key])
        }
        return searchParams;
    }
}
