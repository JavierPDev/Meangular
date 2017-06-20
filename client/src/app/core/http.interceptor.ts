import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Http,
  Headers
} from '@angular/http';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

/**
 * Add functionality to normal http service. Slim loading bar displays when
 * requests are in progress. Slim loading bar goes away once a response or error
 * is returned.
 *
 * @export
 */
@Injectable()
export class InterceptedHttp extends Http {
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private _slimLoadingBarService: SlimLoadingBarService
  ) {
    super(backend, defaultOptions);
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this._slimLoadingBarService.start();

    return super.request(url, options)
      .finally(() => this._slimLoadingBarService.complete());
  }
}
